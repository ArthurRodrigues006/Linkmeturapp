'use client';

import { useState, useEffect } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';

interface Notification {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
}

interface NotificationToastProps {
  onNotificationReceived?: (notification: Notification) => void;
}

export default function NotificationToast({ onNotificationReceived }: NotificationToastProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { lastMessage, isConnected } = useWebSocket('ws://localhost:8081');

  useEffect(() => {
    if (lastMessage && lastMessage.type === 'notification') {
      const notification: Notification = {
        id: lastMessage.data.id || Date.now().toString(),
        titulo: lastMessage.data.titulo || 'Nova Notificação',
        mensagem: lastMessage.data.mensagem || '',
        tipo: lastMessage.data.tipo || 'info',
        timestamp: lastMessage.timestamp,
      };

      setNotifications(prev => [notification, ...prev.slice(0, 4)]); // Manter apenas 5 notificações
      
      if (onNotificationReceived) {
        onNotificationReceived(notification);
      }

      // Remover notificação após 5 segundos
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
    }
  }, [lastMessage, onNotificationReceived]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (tipo: string) => {
    switch (tipo) {
      case 'success':
        return (
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return (
          <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getNotificationStyles = (tipo: string) => {
    switch (tipo) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-sm w-full border rounded-lg shadow-lg p-4 ${getNotificationStyles(notification.tipo)} transform transition-all duration-300 ease-in-out`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {getNotificationIcon(notification.tipo)}
            </div>
            <div className="ml-3 flex-1">
              <h4 className="text-sm font-medium">
                {notification.titulo}
              </h4>
              <p className="mt-1 text-sm">
                {notification.mensagem}
              </p>
              <p className="mt-1 text-xs opacity-75">
                {new Date(notification.timestamp).toLocaleTimeString('pt-BR')}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={() => removeNotification(notification.id)}
                className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Indicador de conexão */}
      <div className="text-xs text-gray-500 text-right">
        {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
      </div>
    </div>
  );
}

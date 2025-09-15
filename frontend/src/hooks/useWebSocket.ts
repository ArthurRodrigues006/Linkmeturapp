import { useEffect, useRef, useState } from 'react';

interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: string;
}

export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = () => {
    try {
      const token = localStorage.getItem('access_token');
      const wsUrl = `${url}?token=${token}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket conectado');
        setIsConnected(true);
        setError(null);
        reconnectAttempts.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          setLastMessage(message);
        } catch (err) {
          console.error('Erro ao processar mensagem WebSocket:', err);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket desconectado');
        setIsConnected(false);
        
        // Tentar reconectar se não foi um fechamento intencional
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          const delay = Math.pow(2, reconnectAttempts.current) * 1000; // Backoff exponencial
          
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(`Tentativa de reconexão ${reconnectAttempts.current}/${maxReconnectAttempts}`);
            connect();
          }, delay);
        } else {
          setError('Não foi possível reconectar ao servidor');
        }
      };

      ws.onerror = (error) => {
        console.error('Erro no WebSocket:', error);
        setError('Erro de conexão WebSocket');
      };

      setSocket(ws);
    } catch (err) {
      console.error('Erro ao conectar WebSocket:', err);
      setError('Erro ao conectar WebSocket');
    }
  };

  const disconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (socket) {
      socket.close();
      setSocket(null);
    }
    
    setIsConnected(false);
  };

  const sendMessage = (message: any) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket não está conectado');
    }
  };

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [url]);

  return {
    socket,
    isConnected,
    lastMessage,
    error,
    sendMessage,
    connect,
    disconnect,
  };
};

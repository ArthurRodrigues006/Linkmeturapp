// app/mensagens/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

// Dados simulados para demonstração
const mockConversations = [
  {
    id: 1,
    nome: "Maria Santos Marketing",
    lastMessage: "Ótimo! Vamos agendar uma reunião para discutir os detalhes do projeto.",
    timestamp: "14:32",
    unread: 2,
    online: true,
    foto: "MS"
  },
  {
    id: 2,
    nome: "TechSolutions RS",
    lastMessage: "Enviei a proposta por email. Quando puder dar uma olhada?",
    timestamp: "12:15",
    unread: 0,
    online: false,
    foto: "TS"
  },
  {
    id: 3,
    nome: "Hotel Fazenda Recanto",
    lastMessage: "Obrigado pelo interesse! Estamos ansiosos para trabalhar juntos.",
    timestamp: "Ontem",
    unread: 1,
    online: true,
    foto: "HR"
  },
  {
    id: 4,
    nome: "Consultoria Jurídica Turismo",
    lastMessage: "Os documentos estão prontos para assinatura.",
    timestamp: "Ontem",
    unread: 0,
    online: false,
    foto: "CJ"
  }
];

const mockMessages = [
  {
    id: 1,
    sender: "Maria Santos Marketing",
    message: "Olá! Vi seu perfil na LinkMe Tur e gostaria de conversar sobre uma parceria para marketing digital.",
    timestamp: "14:20",
    isOwn: false
  },
  {
    id: 2,
    sender: "Você",
    message: "Oi Maria! Que bom te conhecer. Estamos mesmo precisando de ajuda com marketing digital. Pode me contar mais sobre seus serviços?",
    timestamp: "14:25",
    isOwn: true
  },
  {
    id: 3,
    sender: "Maria Santos Marketing",
    message: "Claro! Trabalho há 8 anos com marketing digital focado no setor turístico. Posso ajudar com SEO, redes sociais, Google Ads e estratégias de conteúdo.",
    timestamp: "14:28",
    isOwn: false
  },
  {
    id: 4,
    sender: "Maria Santos Marketing",
    message: "Ótimo! Vamos agendar uma reunião para discutir os detalhes do projeto.",
    timestamp: "14:32",
    isOwn: false
  }
];

export default function Mensagens() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "Você",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className="font-sans min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <Link href="/" className="text-xl font-bold">
            LinkMe<span className="text-[#2BE58F]">Tur</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 transition">Dashboard</Link>
            <Link href="/buscar" className="text-gray-600 hover:text-gray-800 transition">Buscar</Link>
            <Link href="/mensagens" className="text-[#2BE58F] font-medium">Mensagens</Link>
            <Link href="/perfil" className="text-gray-600 hover:text-gray-800 transition">Perfil</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-[#2BE58F] rounded-full flex items-center justify-center text-black font-bold">
              J
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="flex h-full">
            
            {/* CONVERSATIONS SIDEBAR */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              
              {/* Sidebar Header */}
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Mensagens</h1>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar conversas..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {mockConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${
                      selectedConversation.id === conversation.id ? 'bg-blue-50 border-l-4 border-l-[#2BE58F]' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-[#2BE58F] rounded-full flex items-center justify-center text-black font-bold">
                          {conversation.foto}
                        </div>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-semibold text-gray-800 truncate">
                            {conversation.nome}
                          </h3>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      
                      {conversation.unread > 0 && (
                        <div className="w-5 h-5 bg-[#2BE58F] rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-black">{conversation.unread}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CHAT AREA */}
            <div className="flex-1 flex flex-col">
              
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-[#2BE58F] rounded-full flex items-center justify-center text-black font-bold">
                        {selectedConversation.foto}
                      </div>
                      {selectedConversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{selectedConversation.nome}</h2>
                      <p className="text-sm text-gray-600">
                        {selectedConversation.online ? 'Online agora' : 'Visto por último ontem'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zm-8 3a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn 
                        ? 'bg-[#2BE58F] text-black' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-black opacity-70' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex space-x-4">
                  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  <div className="flex-1 relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua mensagem..."
                      rows={1}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition resize-none"
                    />
                  </div>
                  
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    variant="contained"
                    sx={{
                      backgroundColor: CTA_BG,
                      color: "black",
                      "&:hover": { backgroundColor: CTA_HOVER },
                      "&:disabled": { backgroundColor: "#gray-300" },
                      minWidth: "auto",
                      px: 3,
                      textTransform: "none",
                    }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

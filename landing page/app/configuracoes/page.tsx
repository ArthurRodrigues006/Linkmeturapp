// app/configuracoes/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState("notificacoes");
  const [notifications, setNotifications] = useState({
    novasPropostas: true,
    prioridadePropostas: true,
    receberEmailPropostas: true,
    receberSmsPropostas: false,
    mensagens: true,
    destacarMensagensRecorrentes: true,
    receberEmailMensagens: true,
    receberSmsMensagens: false,
    avaliacoes: true,
    receberEmailAvaliacoes: true,
    atualizacoesSistema: true,
    receberEmailAtualizacoes: true,
    modoNaoPertube: false
  });

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="text-xl font-bold">
            LinkMe<span className="text-[#2BE58F]">Tur</span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">CO</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Carlos Oliveira</div>
              <div className="text-xs text-gray-500">Prestador de Serviços</div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" />
                </svg>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/perfil" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>Meu Perfil</span>
              </Link>
            </li>
            <li>
              <Link href="/cadastrar-servico" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>Meus Serviços</span>
              </Link>
            </li>
            <li>
              <Link href="/mensagens" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <span>Mensagens</span>
              </Link>
            </li>
            <li>
              <Link href="/metricas" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 7v10a2 2 0 002 2h9a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" clipRule="evenodd" />
                </svg>
                <span>Métricas</span>
              </Link>
            </li>
            <li>
              <Link href="/configuracoes" className="flex items-center space-x-3 px-3 py-2 text-[#2BE58F] bg-green-50 rounded-lg font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <span>Configurações</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto">
        {/* TOP BAR */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Link href="/notificacoes" className="p-2 text-gray-600 hover:text-gray-800 transition block">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </Link>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">3</span>
              </div>
              
              {/* Messages */}
              <div className="relative">
                <Link href="/mensagens" className="p-2 text-gray-600 hover:text-gray-800 transition block">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </Link>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">5</span>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition">
                  <span className="text-sm font-medium">PT</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-6">
          {/* Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("notificacoes")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "notificacoes"
                    ? "border-[#2BE58F] text-[#2BE58F]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Notificações
              </button>
              <button
                onClick={() => setActiveTab("conta")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "conta"
                    ? "border-[#2BE58F] text-[#2BE58F]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Conta
              </button>
              <button
                onClick={() => setActiveTab("privacidade")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "privacidade"
                    ? "border-[#2BE58F] text-[#2BE58F]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Privacidade
              </button>
              <button
                onClick={() => setActiveTab("pagamentos")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "pagamentos"
                    ? "border-[#2BE58F] text-[#2BE58F]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Pagamentos
              </button>
            </nav>
          </div>

          {/* NOTIFICAÇÕES TAB */}
          {activeTab === "notificacoes" && (
            <div className="max-w-4xl">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Gerenciamento de Notificações</h2>
                <p className="text-gray-600">
                  Personalize como e quando você recebe notificações da plataforma LinkMe Tur. Configure suas 
                  preferências para ficar informado sobre propostas, mensagens e outras atualizações importantes.
                </p>
                
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm text-green-800">
                        <strong>As notificações prioritárias são destacadas em vermelho para maior visibilidade e podem ser configuradas abaixo.</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Tipos de Notificações */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Tipos de Notificações</h3>
                  
                  {/* Novas Propostas */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Novas Propostas</h4>
                          <p className="text-sm text-gray-600">Receba notificações quando uma empresa de turismo enviar uma proposta para seus serviços</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.novasPropostas}
                          onChange={() => handleNotificationChange('novasPropostas')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2BE58F]"></div>
                      </label>
                    </div>
                    
                    <div className="ml-14 space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={notifications.prioridadePropostas}
                          onChange={() => handleNotificationChange('prioridadePropostas')}
                          className="w-4 h-4 text-[#2BE58F] bg-gray-100 border-gray-300 rounded focus:ring-[#2BE58F] focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-gray-700">Marcar como prioritárias propostas com prazo curto</span>
                        <span className="ml-2 text-red-500">!</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={notifications.receberEmailPropostas}
                          onChange={() => handleNotificationChange('receberEmailPropostas')}
                          className="w-4 h-4 text-[#2BE58F] bg-gray-100 border-gray-300 rounded focus:ring-[#2BE58F] focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-gray-700">Receber também por e-mail</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={notifications.receberSmsPropostas}
                          onChange={() => handleNotificationChange('receberSmsPropostas')}
                          className="w-4 h-4 text-[#2BE58F] bg-gray-100 border-gray-300 rounded focus:ring-[#2BE58F] focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-gray-700">Receber também por SMS</span>
                      </label>
                    </div>
                  </div>

                  {/* Mensagens */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Mensagens</h4>
                          <p className="text-sm text-gray-600">Receba notificações quando clientes enviarem mensagens sobre seus serviços</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.mensagens}
                          onChange={() => handleNotificationChange('mensagens')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2BE58F]"></div>
                      </label>
                    </div>
                    
                    <div className="ml-14 space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={notifications.destacarMensagensRecorrentes}
                          onChange={() => handleNotificationChange('destacarMensagensRecorrentes')}
                          className="w-4 h-4 text-[#2BE58F] bg-gray-100 border-gray-300 rounded focus:ring-[#2BE58F] focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-gray-700">Destacar mensagens de clientes recorrentes</span>
                        <span className="ml-2 text-red-500">!</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={notifications.receberEmailMensagens}
                          onChange={() => handleNotificationChange('receberEmailMensagens')}
                          className="w-4 h-4 text-[#2BE58F] bg-gray-100 border-gray-300 rounded focus:ring-[#2BE58F] focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-gray-700">Receber também por e-mail</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={notifications.receberSmsMensagens}
                          onChange={() => handleNotificationChange('receberSmsMensagens')}
                          className="w-4 h-4 text-[#2BE58F] bg-gray-100 border-gray-300 rounded focus:ring-[#2BE58F] focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-gray-700">Receber também por SMS</span>
                      </label>
                    </div>
                  </div>

                  {/* Avaliações */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Avaliações</h4>
                          <p className="text-sm text-gray-600">Receba notificações quando seus serviços forem avaliados por clientes</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.avaliacoes}
                          onChange={() => handleNotificationChange('avaliacoes')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2BE58F]"></div>
                      </label>
                    </div>
                    
                    <div className="ml-14 space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={notifications.receberEmailAvaliacoes}
                          onChange={() => handleNotificationChange('receberEmailAvaliacoes')}
                          className="w-4 h-4 text-[#2BE58F] bg-gray-100 border-gray-300 rounded focus:ring-[#2BE58F] focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-gray-700">Receber também por e-mail</span>
                      </label>
                    </div>
                  </div>

                  {/* Atualizações do Sistema */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                          <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Atualizações do Sistema</h4>
                          <p className="text-sm text-gray-600">Receba notificações sobre atualizações e novidades da plataforma</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.atualizacoesSistema}
                          onChange={() => handleNotificationChange('atualizacoesSistema')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2BE58F]"></div>
                      </label>
                    </div>
                    
                    <div className="ml-14 space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={notifications.receberEmailAtualizacoes}
                          onChange={() => handleNotificationChange('receberEmailAtualizacoes')}
                          className="w-4 h-4 text-[#2BE58F] bg-gray-100 border-gray-300 rounded focus:ring-[#2BE58F] focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-gray-700">Receber também por e-mail</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Configurações Globais */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Configurações Globais</h3>
                  
                  <div className="bg-red-50 rounded-lg border border-red-200 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Modo Não Perturbe</h4>
                          <p className="text-sm text-gray-600">Desative temporariamente todas as notificações</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.modoNaoPertube}
                          onChange={() => handleNotificationChange('modoNaoPertube')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Paginação */}
                <div className="flex items-center justify-center mt-8">
                  <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <span className="text-sm text-gray-600">24 / 26</span>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-8">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: CTA_BG,
                      color: "black",
                      "&:hover": { backgroundColor: CTA_HOVER },
                      px: 6,
                      py: 2,
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Salvar Configurações
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Outras abas podem ser implementadas aqui */}
          {activeTab === "conta" && (
            <div className="text-center py-12">
              <p className="text-gray-600">Configurações de conta em desenvolvimento...</p>
            </div>
          )}

          {activeTab === "privacidade" && (
            <div className="text-center py-12">
              <p className="text-gray-600">Configurações de privacidade em desenvolvimento...</p>
            </div>
          )}

          {activeTab === "pagamentos" && (
            <div className="text-center py-12">
              <p className="text-gray-600">Configurações de pagamentos em desenvolvimento...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

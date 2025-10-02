// app/empresa/eco-aventuras/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

export default function EcoAventuras() {
  const [activeTab, setActiveTab] = useState("informacoes");

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
              <Link href="/configuracoes" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition">
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
            <h1 className="text-2xl font-bold text-gray-800">Perfil da Empresa</h1>
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

        {/* HERO SECTION */}
        <div className="relative h-64 bg-gradient-to-r from-[#2BE58F] to-green-600 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative h-full flex items-center justify-between px-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white rounded-lg p-4 shadow-lg">
                <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-lg">EA</span>
                </div>
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">Eco Aventuras</h1>
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Gramado, RS</span>
                </div>
              </div>
            </div>
            <div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "#2BE58F",
                  "&:hover": { backgroundColor: "#f9fafb" },
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                ♥ Favoritar
              </Button>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {/* Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("informacoes")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "informacoes"
                    ? "border-[#2BE58F] text-[#2BE58F]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Informações
              </button>
              <button
                onClick={() => setActiveTab("historico")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "historico"
                    ? "border-[#2BE58F] text-[#2BE58F]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Histórico
              </button>
            </nav>
          </div>

          {/* INFORMAÇÕES TAB */}
          {activeTab === "informacoes" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Informações Básicas */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Informações Básicas</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Nome</label>
                      <p className="text-gray-800">Eco Aventuras</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Localização</label>
                      <p className="text-gray-800">Rua das Hortênsias, 123 - Centro, Gramado, RS</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Segmento</label>
                      <p className="text-gray-800">Agência de Ecoturismo</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Telefone</label>
                      <p className="text-gray-800">(54) 3295-1234</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">E-mail</label>
                      <p className="text-gray-800">contato@ecoaventuras.com.br</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Site</label>
                      <Link href="#" className="text-[#2BE58F] hover:text-[#27CC7A]">www.ecoaventuras.com.br</Link>
                    </div>
                  </div>
                </div>

                {/* Sobre a Empresa */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Sobre a Empresa</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    A Eco Aventuras é uma agência especializada em ecoturismo fundada em 2015, com foco em proporcionar experiências 
                    sustentáveis e imersivas na natureza da Serra Gaúcha. Nossa missão é conectar pessoas com a natureza de forma responsável 
                    e educativa, promovendo a conservação ambiental e o desenvolvimento das comunidades locais.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Oferecemos roteiros exclusivos de trilhas, rapel, observação de aves, turismo rural e experiências gastronômicas com 
                    comunidades tradicionais. Todos os nossos guias são certificados e especialistas em educação ambiental.
                  </p>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Estatísticas</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Membro desde</span>
                      <span className="text-sm font-medium text-gray-800">Março 2025</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Serviços contratados</span>
                      <span className="text-sm font-medium text-gray-800">7</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avaliações feitas</span>
                      <span className="text-sm font-medium text-gray-800">5</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Nota média dada</span>
                      <div className="flex items-center">
                        <div className="flex text-yellow-400 mr-2">
                          {[...Array(4)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <svg className="w-4 h-4 fill-current text-gray-300" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-800">4.5</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certificações */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Certificações</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#2BE58F] rounded-full mr-3"></div>
                      <span className="text-sm text-gray-700">CADASTUR</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#2BE58F] rounded-full mr-3"></div>
                      <span className="text-sm text-gray-700">Turismo Responsável</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#2BE58F] rounded-full mr-3"></div>
                      <span className="text-sm text-gray-700">ISO 14001</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HISTÓRICO TAB */}
          {activeTab === "historico" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Histórico de Interações</h3>
                <p className="text-gray-600">Nenhuma interação registrada ainda</p>
              </div>
            </div>
          )}

          {/* Paginação */}
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-sm text-gray-600">19 / 26</span>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

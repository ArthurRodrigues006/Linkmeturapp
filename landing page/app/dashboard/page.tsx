// app/dashboard/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

export default function Dashboard() {
  const [userType, setUserType] = useState<"empresa" | "prestador">("prestador"); // Simulando tipo do usuário
  const [userName] = useState("Carlos Oliveira"); // Simulando nome do usuário
  const [userRole] = useState("Prestador de Serviços"); // Simulando cargo

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
              <div className="text-sm font-medium text-gray-800">{userName}</div>
              <div className="text-xs text-gray-500">{userRole}</div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2 text-[#2BE58F] bg-green-50 rounded-lg font-medium">
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
              <Link href="/buscar" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition">
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
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
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

        {/* DASHBOARD CONTENT */}
        <div className="p-6">
          {/* Métricas-chave */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Métricas-chave</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Visualizações do Perfil */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Visualizações</p>
                    <p className="text-xs text-gray-500">do Perfil</p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">248</div>
                    <div className="flex items-center text-sm">
                      <span className="text-green-600 font-medium">↗ 12.5%</span>
                      <span className="text-gray-500 ml-1">desde o último mês</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Propostas Recebidas */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Propostas</p>
                    <p className="text-xs text-gray-500">Recebidas</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">32</div>
                    <div className="flex items-center text-sm">
                      <span className="text-green-600 font-medium">↗ 8.3%</span>
                      <span className="text-gray-500 ml-1">desde o último mês</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contatos */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Contatos</p>
                    <p className="text-xs text-gray-500"></p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">156</div>
                    <div className="flex items-center text-sm">
                      <span className="text-green-600 font-medium">↗ 8.3%</span>
                      <span className="text-gray-500 ml-1">desde o último mês</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Avaliação Média */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Avaliação</p>
                    <p className="text-xs text-gray-500">Média</p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">4.8</div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500">baseado em 42 avaliações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Ações Rápidas */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Ações Rápidas</h2>
              <Link href="/servicos" className="text-sm text-[#2BE58F] hover:text-[#27CC7A] font-medium">
                Ver todas →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Cadastrar Serviço */}
              <Link href="/cadastrar-servico" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-[#2BE58F] transition">
                    <svg className="w-5 h-5 text-green-600 group-hover:text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Cadastrar Serviço</h3>
                <p className="text-sm text-gray-600">Adicione um novo serviço</p>
              </Link>

              {/* Gerenciar Categorias */}
              <Link href="/categorias" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-[#2BE58F] transition">
                    <svg className="w-5 h-5 text-blue-600 group-hover:text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Gerenciar Categorias</h3>
                <p className="text-sm text-gray-600">Edite categorias e subcategorias</p>
              </Link>

              {/* Ver Mensagens */}
              <Link href="/mensagens" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-[#2BE58F] transition">
                    <svg className="w-5 h-5 text-purple-600 group-hover:text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Ver Mensagens</h3>
                <p className="text-sm text-gray-600">5 mensagens não lidas</p>
              </Link>

              {/* Editar Perfil */}
              <Link href="/perfil" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-[#2BE58F] transition">
                    <svg className="w-5 h-5 text-orange-600 group-hover:text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Editar Perfil</h3>
                <p className="text-sm text-gray-600">Atualize suas informações</p>
              </Link>
            </div>

            {/* Paginação */}
            <div className="flex items-center justify-center mt-6">
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="text-sm text-gray-600">14 / 26</span>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Serviços Ativos */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Serviços Ativos</h2>
              <Link href="/servicos" className="text-sm text-[#2BE58F] hover:text-[#27CC7A] font-medium">
                Ver todos →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Serviço 1 - Fotografia */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <div className="text-sm font-medium">Fotografia Profissional</div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#2BE58F] text-black text-xs font-medium px-2 py-1 rounded-full">
                      Disponível
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">Marketing</span>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">Fotografia</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Fotografia Profissional para Hotelaria</h3>
                  <p className="text-sm text-gray-600 mb-3">Serviço de fotografia especializada para hotéis, pousadas e restaurantes...</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-800">R$ 1.800,00</span>
                    <Link href="/servicos/1" className="text-sm text-[#2BE58F] hover:text-[#27CC7A] font-medium">
                      Detalhes
                    </Link>
                  </div>
                </div>
              </div>

              {/* Serviço 2 - Website */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                      </svg>
                      <div className="text-sm font-medium">Website Responsivo</div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-yellow-500 text-black text-xs font-medium px-2 py-1 rounded-full">
                      Em negociação
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">Tecnologia</span>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">Web Design</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Desenvolvimento de Website Responsivo</h3>
                  <p className="text-sm text-gray-600 mb-3">Criação de sites modernos e otimizados para dispositivos móveis...</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-800">R$ 4.500,00</span>
                    <Link href="/servicos/2" className="text-sm text-[#2BE58F] hover:text-[#27CC7A] font-medium">
                      Detalhes
                    </Link>
                  </div>
                </div>
              </div>

              {/* Serviço 3 - Consultoria */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                      <div className="text-sm font-medium">Consultoria Turística</div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#2BE58F] text-black text-xs font-medium px-2 py-1 rounded-full">
                      Disponível
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">Consultoria</span>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">Estratégia</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Consultoria em Gestão Turística</h3>
                  <p className="text-sm text-gray-600 mb-3">Análise e implementação de estratégias para melhorar a gestão...</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-800">R$ 3.200,00</span>
                    <Link href="/servicos/3" className="text-sm text-[#2BE58F] hover:text-[#27CC7A] font-medium">
                      Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Notificações Recentes */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Notificações Recentes</h2>
                <Link href="/notificacoes" className="text-sm text-[#2BE58F] hover:text-[#27CC7A] font-medium">
                  Ver todas →
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="space-y-4">
                  {/* Notificação 1 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800">Nova proposta recebida</h4>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-600">Pousada Recanto Verde está interessada no seu serviço de fotografia</p>
                      <p className="text-xs text-gray-500 mt-1">Hoje, 09:45</p>
                    </div>
                  </div>

                  {/* Notificação 2 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800">Nova mensagem</h4>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-600">João da Agência Aventuras enviou uma mensagem sobre seu serviço</p>
                      <p className="text-xs text-gray-500 mt-1">Ontem, 15:32</p>
                    </div>
                  </div>

                  {/* Notificação 3 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">Nova avaliação</h4>
                      <p className="text-sm text-gray-600">Hotel Montanha Azul avaliou seu serviço de consultoria com 5 estrelas</p>
                      <p className="text-xs text-gray-500 mt-1">2 dias atrás</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

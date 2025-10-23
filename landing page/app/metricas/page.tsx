// app/metricas/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

export default function Metricas() {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [chartView, setChartView] = useState("semanal");

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
              <Link href="/metricas" className="flex items-center space-x-3 px-3 py-2 text-[#2BE58F] bg-green-50 rounded-lg font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" />
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
            <h1 className="text-2xl font-bold text-gray-800">Métricas</h1>
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
          {/* Period Selector */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Período de Análise</h2>
            <div className="flex items-center justify-between">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {["30", "90", "180", "365"].map((days) => (
                  <button
                    key={days}
                    onClick={() => setSelectedPeriod(days)}
                    className={`px-4 py-2 rounded-md text-sm transition ${
                      selectedPeriod === days
                        ? "bg-[#2BE58F] text-black font-medium"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {days === "30" && "30 dias"}
                    {days === "90" && "90 dias"}
                    {days === "180" && "6 meses"}
                    {days === "365" && "1 ano"}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  defaultValue="01/04/2025 - 30/04/2025"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none w-48"
                />
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: CTA_BG,
                    color: "black",
                    "&:hover": { backgroundColor: CTA_HOVER },
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Aplicar
                </Button>
              </div>
            </div>
          </section>

          {/* Resumo de Desempenho */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Resumo de Desempenho</h2>
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
                <div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">1,248</div>
                  <div className="flex items-center text-sm">
                    <span className="text-green-600 font-medium">↗ 22.5%</span>
                    <span className="text-gray-500 ml-1">comparado</span>
                  </div>
                  <div className="text-xs text-gray-500">ao período anterior</div>
                </div>
              </div>

              {/* Tempo Médio de Resposta */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Tempo Médio</p>
                    <p className="text-xs text-gray-500">de Resposta</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">1h 32min</div>
                  <div className="flex items-center text-sm">
                    <span className="text-red-600 font-medium">↓ 15.3%</span>
                    <span className="text-gray-500 ml-1">comparado ao</span>
                  </div>
                  <div className="text-xs text-gray-500">período anterior</div>
                </div>
              </div>

              {/* Contatos Recebidos */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Contatos</p>
                    <p className="text-xs text-gray-500">Recebidos</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">87</div>
                  <div className="flex items-center text-sm">
                    <span className="text-green-600 font-medium">↗ 8.7%</span>
                    <span className="text-gray-500 ml-1">comparado ao</span>
                  </div>
                  <div className="text-xs text-gray-500">período anterior</div>
                </div>
              </div>

              {/* Taxa de Conversão */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Taxa de</p>
                    <p className="text-xs text-gray-500">Conversão</p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">18.5%</div>
                  <div className="flex items-center text-sm">
                    <span className="text-red-600 font-medium">↓ 2.1%</span>
                    <span className="text-gray-500 ml-1">comparado ao</span>
                  </div>
                  <div className="text-xs text-gray-500">período anterior</div>
                </div>
              </div>
            </div>
          </section>

          {/* Visualizações do Perfil ao Longo do Tempo */}
          <section className="mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Visualizações do Perfil ao Longo do Tempo</h2>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {["diario", "semanal", "mensal"].map((view) => (
                    <button
                      key={view}
                      onClick={() => setChartView(view)}
                      className={`px-3 py-1 rounded-md text-sm transition ${
                        chartView === view
                          ? "bg-white shadow-sm text-gray-800 font-medium"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {view === "diario" && "Diário"}
                      {view === "semanal" && "Semanal"}
                      {view === "mensal" && "Mensal"}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Gráfico de Barras */}
              <div className="h-64 flex items-end justify-between space-x-1 mb-4">
                {[
                  { height: 30, label: "Sem 1" },
                  { height: 45, label: "Sem 2" },
                  { height: 35, label: "Sem 3" },
                  { height: 60, label: "Sem 4" },
                  { height: 75, label: "Sem 5" },
                  { height: 55, label: "Sem 6" },
                  { height: 40, label: "Sem 7" },
                  { height: 85, label: "Sem 8" },
                  { height: 95, label: "Sem 9" },
                  { height: 80, label: "Sem 10" },
                  { height: 90, label: "Sem 11" },
                  { height: 100, label: "Sem 12" }
                ].map((bar, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-[#2BE58F] rounded-t transition-all duration-500 hover:bg-[#27CC7A] cursor-pointer"
                      style={{ height: `${bar.height}%` }}
                      title={`${bar.label}: ${Math.round(bar.height * 12)} visualizações`}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                      {bar.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#2BE58F] rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Visualizações do perfil</span>
                </div>
                <span className="text-sm font-medium text-gray-800">Total: 1,248</span>
              </div>

              {/* Paginação do gráfico */}
              <div className="flex items-center justify-center mt-6">
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="text-sm text-gray-600">25 / 26</span>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Desempenho por Serviço */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Desempenho por Serviço</h2>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none">
                <option>Últimos 30 dias</option>
                <option>Últimos 90 dias</option>
                <option>Últimos 6 meses</option>
              </select>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serviço</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Visualizações</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Contatos</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Taxa de<br/>Conversão</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Avaliação</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">Fotografia Profissional para</div>
                            <div className="text-sm font-medium text-gray-900">Hotelaria</div>
                            <div className="text-xs text-gray-500">Marketing</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">482</td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">38</td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">7.9%</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
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
                          <span className="text-sm font-medium text-gray-900">4.7</span>
                        </div>
                      </td>
                    </tr>
                    
                    <tr>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">Desenvolvimento de Website</div>
                            <div className="text-sm font-medium text-gray-900">Responsivo</div>
                            <div className="text-xs text-gray-500">Tecnologia</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">356</td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">25</td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">7.0%</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="flex text-yellow-400 mr-2">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-900">5.0</span>
                        </div>
                      </td>
                    </tr>
                    
                    <tr>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">Consultoria em Gestão Turística</div>
                            <div className="text-xs text-gray-500">Consultoria</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">410</td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">24</td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">5.9%</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
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
                          <span className="text-sm font-medium text-gray-900">4.0</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Dados Demográficos da Audiência */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Dados Demográficos da Audiência</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Visualizações por Tipo de Empresa */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-md font-semibold text-gray-800 mb-6">Visualizações por Tipo de Empresa</h3>
                
                {/* Gráfico de Rosquinha */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 42 42">
                      {/* Hospedagem - 35% (Verde) */}
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#2BE58F" strokeWidth="6" 
                              strokeDasharray="35 65" strokeDashoffset="0"/>
                      {/* Agências - 25% (Azul) */}
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#3b82f6" strokeWidth="6" 
                              strokeDasharray="25 75" strokeDashoffset="-35"/>
                      {/* Atrativos - 20% (Roxo) */}
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#8b5cf6" strokeWidth="6" 
                              strokeDasharray="20 80" strokeDashoffset="-60"/>
                      {/* Alimentação - 15% (Vermelho) */}
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#ef4444" strokeWidth="6" 
                              strokeDasharray="15 85" strokeDashoffset="-80"/>
                      {/* Outros - 5% (Amarelo) */}
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="6" 
                              strokeDasharray="5 95" strokeDashoffset="-95"/>
                    </svg>
                    {/* Labels dentro do gráfico */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs text-gray-600">Hospedagem (35%)</div>
                        <div className="text-xs text-gray-600">Agências (25%)</div>
                        <div className="text-xs text-gray-600">Atrativos (20%)</div>
                        <div className="text-xs text-gray-600">Alimentação (15%)</div>
                        <div className="text-xs text-gray-600">Outros (5%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visualizações por Localização */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-md font-semibold text-gray-800 mb-6">Visualizações por Localização</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Porto Alegre</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-[#2BE58F] h-2 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">42%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Gramado</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-[#2BE58F] h-2 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">28%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Canela</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-[#2BE58F] h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">15%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Bento Gonçalves</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-[#2BE58F] h-2 rounded-full" style={{ width: '8%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">8%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Outros</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-[#2BE58F] h-2 rounded-full" style={{ width: '7%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">7%</span>
                    </div>
                  </div>
                </div>

                {/* Paginação */}
                <div className="flex items-center justify-center mt-6">
                  <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <span className="text-sm text-gray-600">25 / 26</span>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recomendações para Melhorar seu Desempenho */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Recomendações para Melhorar seu Desempenho</h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">Melhore seu tempo de resposta</h4>
                    <p className="text-sm text-blue-700">
                      Embora seu tempo de resposta tenha melhorado, responder em menos de 1 hora pode 
                      aumentar sua taxa de conversão em até 15%.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-800 mb-1">Adicione mais exemplos visuais</h4>
                    <p className="text-sm text-purple-700">
                      Serviços com 5+ imagens recebem 70% mais visualizações. Considere adicionar mais imagens 
                      aos seus serviços de consultoria.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">Otimize suas palavras-chave</h4>
                    <p className="text-sm text-yellow-700">
                      Adicione palavras-chave como "sustentabilidade" e "experiência digital" para alcançar mais 
                      empresas de hospedagem.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Paginação final */}
            <div className="flex items-center justify-center mt-8">
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="text-sm text-gray-600">25 / 26</span>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
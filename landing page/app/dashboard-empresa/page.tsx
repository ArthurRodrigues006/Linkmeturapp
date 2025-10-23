// app/dashboard-empresa/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

export default function DashboardEmpresa() {
  const [userName] = useState("Hotel Pousada do Vale");

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-6">
          <Link href="/" className="text-xl font-bold">
            LinkMe<span className="text-[#2BE58F]">Tur</span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 px-3 py-1 rounded text-xs font-medium text-green-800">
              EMPRESA DE TURISMO
            </div>
            <span className="text-gray-600">Olá, {userName}</span>
            <Link 
              href="/perfil"
              className="text-gray-600 hover:text-gray-800 transition"
            >
              Perfil
            </Link>
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-800 transition"
            >
              Sair
            </Link>
          </div>
        </div>
      </header>

      {/* DASHBOARD EMPRESA */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">DASHBOARD</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* VISUALIZAÇÕES DO PERFIL */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">VISUALIZAÇÕES DO PERFIL</h2>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2BE58F] mb-2">89</div>
                <p className="text-gray-600">visualizações este mês</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Hoje:</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Esta semana:</span>
                  <span className="font-medium">23</span>
                </div>
              </div>
            </div>

            {/* DESAFIOS LANÇADOS/PROPOSTAS RECEBIDAS */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">DESAFIOS LANÇADOS/PROPOSTAS RECEBIDAS</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">Site Institucional</div>
                    <div className="text-xs text-gray-600">3 propostas recebidas</div>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Ativo</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">Marketing Digital</div>
                    <div className="text-xs text-gray-600">Prestador selecionado</div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Em andamento</span>
                </div>
              </div>
            </div>

            {/* NEGOCIAÇÕES */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">NEGOCIAÇÕES</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">ABERTAS</h3>
                  <div className="text-2xl font-bold text-blue-600">2</div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">CONTRATADAS</h3>
                  <div className="text-2xl font-bold text-green-600">8</div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">CANCELADAS</h3>
                  <div className="text-2xl font-bold text-red-600">2</div>
                </div>
              </div>
            </div>
          </div>

          {/* DESAFIOS/NECESSIDADES ABERTAS */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meus Desafios Ativos</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded">
                  <div>
                    <h3 className="font-medium text-gray-800">Preciso de novo site institucional</h3>
                    <p className="text-sm text-gray-600">Categoria: Tecnologia | Orçamento: R$ 3.000</p>
                    <p className="text-xs text-gray-500">Publicado há 2 dias • 3 propostas recebidas</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: CTA_BG,
                        color: CTA_BG,
                        "&:hover": { backgroundColor: CTA_BG, color: "black" },
                        textTransform: "none",
                      }}
                    >
                      Ver Propostas
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      sx={{ color: "gray", textTransform: "none" }}
                    >
                      Editar
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded">
                  <div>
                    <h3 className="font-medium text-gray-800">Consultoria em sustentabilidade</h3>
                    <p className="text-sm text-gray-600">Categoria: Consultoria | Orçamento: R$ 1.500</p>
                    <p className="text-xs text-gray-500">Publicado há 5 dias • 1 proposta recebida</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: CTA_BG,
                        color: CTA_BG,
                        "&:hover": { backgroundColor: CTA_BG, color: "black" },
                        textTransform: "none",
                      }}
                    >
                      Ver Propostas
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      sx={{ color: "gray", textTransform: "none" }}
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AÇÕES RÁPIDAS */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: CTA_BG,
                  color: "black",
                  "&:hover": { backgroundColor: CTA_HOVER },
                  py: 1.5,
                  borderRadius: "8px",
                  textTransform: "none",
                }}
              >
                Lançar Desafio/Solicitar Serviço
              </Button>
              
              <Link href="/buscar">
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: CTA_BG,
                    color: CTA_BG,
                    "&:hover": { 
                      backgroundColor: CTA_BG,
                      color: "black",
                      borderColor: CTA_BG 
                    },
                    py: 1.5,
                    borderRadius: "8px",
                    textTransform: "none",
                  }}
                >
                  Buscar Prestadores
                </Button>
              </Link>
              
              <Link href="/perfil">
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: CTA_BG,
                    color: CTA_BG,
                    "&:hover": { 
                      backgroundColor: CTA_BG,
                      color: "black",
                      borderColor: CTA_BG 
                    },
                    py: 1.5,
                    borderRadius: "8px",
                    textTransform: "none",
                  }}
                >
                  Editar Perfil
                </Button>
              </Link>
              
              <Link href="/mensagens">
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: CTA_BG,
                    color: CTA_BG,
                    "&:hover": { 
                      backgroundColor: CTA_BG,
                      color: "black",
                      borderColor: CTA_BG 
                    },
                    py: 1.5,
                    borderRadius: "8px",
                    textTransform: "none",
                  }}
                >
                  Mensagens
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
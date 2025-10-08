// app/dashboard/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

export default function Dashboard() {
  const [userName] = useState("Carlos Oliveira");

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
              PRESTADOR DE SERVIÇOS
            </div>
            <span className="text-gray-600">Olá, {userName}</span>
            <Link 
              href="/perfil"
              className="text-gray-600 hover:text-gray-800 transition"
            >
              Perfil
            </Link>
            <Link 
              href="/cadastrar-servico"
              className="text-gray-600 hover:text-gray-800 transition"
            >
              Serviços
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

      {/* DASHBOARD */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">DASHBOARD</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* VISUALIZAÇÕES DO PERFIL */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">VISUALIZAÇÕES DO PERFIL</h2>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2BE58F] mb-2">127</div>
                <p className="text-gray-600">visualizações este mês</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Hoje:</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Esta semana:</span>
                  <span className="font-medium">34</span>
                </div>
              </div>
            </div>

            {/* DESAFIOS ACEITOS/PROPOSTAS ENVIADAS */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">DESAFIOS ACEITOS/PROPOSTAS ENVIADAS</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">Site para Pousada</div>
                    <div className="text-xs text-gray-600">Proposta enviada</div>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pendente</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">Marketing Digital</div>
                    <div className="text-xs text-gray-600">Proposta aceita</div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Aceito</span>
                </div>
              </div>
            </div>

            {/* NEGOCIAÇÕES */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">NEGOCIAÇÕES</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">ABERTAS</h3>
                  <div className="text-2xl font-bold text-blue-600">3</div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">VENDIDAS</h3>
                  <div className="text-2xl font-bold text-green-600">12</div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">PERDIDAS</h3>
                  <div className="text-2xl font-bold text-red-600">5</div>
                </div>
              </div>
            </div>
          </div>

          {/* AÇÕES RÁPIDAS */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              
              <Link href="/cadastrar-servico">
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
                  Cadastrar Serviço
                </Button>
              </Link>
              
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
                  Buscar Desafios
                </Button>
              </Link>
              
              <Link href="/mensagens">
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
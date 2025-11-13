// app/dashboard/page.tsx
"use client";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [stats, setStats] = useState({
    profileViews: 0,
    todayViews: 0,
    weekViews: 0,
    acceptedJobs: 0,
    pendingJobs: 0,
    completedJobs: 0,
    totalEarnings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!token || !userStr) {
      // Se não estiver logado, redirecionar para login
      router.push('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      setUserName(user.name || "Usuário");
      setUserEmail(user.email || "");
      
      // Aqui você pode carregar estatísticas reais do banco
      // Por enquanto, deixa tudo zerado (sem dados fictícios)
      setStats({
        profileViews: 0,
        todayViews: 0,
        weekViews: 0,
        acceptedJobs: 0,
        pendingJobs: 0,
        completedJobs: 0,
        totalEarnings: 0
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

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
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 transition"
            >
              Sair
            </button>
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
                <div className="text-4xl font-bold text-[#2BE58F] mb-2">{stats.profileViews}</div>
                <p className="text-gray-600">visualizações este mês</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Hoje:</span>
                  <span className="font-medium">{stats.todayViews}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Esta semana:</span>
                  <span className="font-medium">{stats.weekViews}</span>
                </div>
              </div>
            </div>

            {/* PROPOSTAS ENVIADAS */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">PROPOSTAS ENVIADAS</h2>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2BE58F] mb-2">{stats.acceptedJobs + stats.pendingJobs}</div>
                <p className="text-gray-600">propostas ativas</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Aceitas:</span>
                  <span className="font-medium text-green-600">{stats.acceptedJobs}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pendentes:</span>
                  <span className="font-medium text-yellow-600">{stats.pendingJobs}</span>
                </div>
              </div>
            </div>

            {/* SERVIÇOS CONCLUÍDOS */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">SERVIÇOS CONCLUÍDOS</h2>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2BE58F] mb-2">{stats.completedJobs}</div>
                <p className="text-gray-600">serviços finalizados</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ganhos totais:</span>
                  <span className="font-medium">R$ {stats.totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
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
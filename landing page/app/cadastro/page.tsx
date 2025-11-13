// app/cadastro/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

export default function Cadastro() {
  const [tipoUsuario, setTipoUsuario] = useState<"prestador" | "empresa" | "">("");
  const [formData, setFormData] = useState({
    cpf: "",
    cnpj: "",
    nome: "",
    telefone: "",
    email: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          telefone: formData.telefone,
          cpf: tipoUsuario === "prestador" ? formData.cpf : undefined,
          cnpj: tipoUsuario === "empresa" ? formData.cnpj : undefined,
          tipoUsuario: tipoUsuario
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Cadastro realizado com sucesso! Redirecionando...");
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
          if (tipoUsuario === "empresa") {
            window.location.href = "/dashboard-empresa";
          } else {
            window.location.href = "/dashboard";
          }
        }, 2000);
      } else {
        setError(result.error || 'Erro no cadastro');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-sans min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-6">
          <Link href="/" className="text-xl font-bold">
            LinkMe<span className="text-[#2BE58F]">Tur</span>
          </Link>
          <Link 
            href="/"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            ← Voltar para home
          </Link>
        </div>
      </header>

      {/* SELEÇÃO DE TIPO */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            PLATAFORMA LINKME TUR
          </h1>
          
          {!tipoUsuario ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* PRESTADORES DE SERVIÇOS */}
              <div 
                onClick={() => setTipoUsuario("prestador")}
                className="bg-white rounded-lg shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-[#2BE58F]"
              >
                <div className="bg-green-100 px-3 py-1 rounded text-sm font-medium text-green-800 mb-6 inline-block">
                  PRESTADORES DE SERVIÇOS
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Para Prestadores</h2>
                <p className="text-gray-600 mb-4">
                  Marketing, tecnologia, jurídico, contabilidade, design, consultorias e mais.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Cadastre seus serviços</li>
                  <li>• Encontre clientes do turismo</li>
                  <li>• Gerencie propostas</li>
                  <li>• Acompanhe negociações</li>
                </ul>
              </div>

              {/* EMPRESAS DE TURISMO */}
              <div 
                onClick={() => setTipoUsuario("empresa")}
                className="bg-white rounded-lg shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-[#2BE58F]"
              >
                <div className="bg-green-100 px-3 py-1 rounded text-sm font-medium text-green-800 mb-6 inline-block">
                  EMPRESAS DE TURISMO
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Para Empresas</h2>
                <p className="text-gray-600 mb-4">
                  Hotéis, pousadas, agências, atrativos, restaurantes, guias e mais.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Lance desafios/solicitações</li>
                  <li>• Encontre prestadores qualificados</li>
                  <li>• Receba propostas</li>
                  <li>• Gerencie projetos</li>
                </ul>
              </div>
            </div>
          ) : (
            /* FORMULÁRIO DE CADASTRO */
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-6">
                  <div className="bg-green-100 px-3 py-1 rounded text-sm font-medium text-green-800 mb-4 inline-block">
                    {tipoUsuario === "prestador" ? "PRESTADORES DE SERVIÇOS" : "EMPRESAS DE TURISMO"}
                  </div>
                  <button 
                    onClick={() => setTipoUsuario("")}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    ← Voltar para seleção
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Mensagens de erro e sucesso */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                      {error}
                    </div>
                  )}
                  
                  {success && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4">
                      {success}
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-gray-800 mb-4">CADASTRO</h3>
                    
                    {/* CPF (para prestador) ou CNPJ (para empresa) */}
                    {tipoUsuario === "prestador" ? (
                      <div className="mb-4">
                        <label htmlFor="cpf" className="block text-sm text-gray-700 mb-1">
                          CPF
                        </label>
                        <input
                          type="text"
                          id="cpf"
                          name="cpf"
                          value={formData.cpf}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                          placeholder="000.000.000-00"
                        />
                      </div>
                    ) : (
                      <div className="mb-4">
                        <label htmlFor="cnpj" className="block text-sm text-gray-700 mb-1">
                          CNPJ
                        </label>
                        <input
                          type="text"
                          id="cnpj"
                          name="cnpj"
                          value={formData.cnpj}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                          placeholder="00.000.000/0000-00"
                        />
                      </div>
                    )}

                    {/* NOME, TELEFONE DO USUÁRIO e EMAIL */}
                    <div className="mb-4">
                      <label htmlFor="nome" className="block text-sm text-gray-700 mb-1">
                        NOME, TELEFONE DO USUÁRIO e EMAIL
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none mb-2"
                        placeholder="Nome completo"
                      />
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none mb-2"
                        placeholder="Telefone"
                      />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                        placeholder="Email"
                      />
                    </div>

                    {/* SENHA */}
                    <div className="mb-6">
                      <label htmlFor="senha" className="block text-sm text-gray-700 mb-1">
                        SENHA
                      </label>
                      <input
                        type="password"
                        id="senha"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                        placeholder="Senha"
                      />
                    </div>
                  </div>

                  {/* Botão Submit */}
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading || !tipoUsuario}
                    sx={{
                      backgroundColor: CTA_BG,
                      color: "black",
                      "&:hover": { backgroundColor: CTA_HOVER },
                      py: 1.5,
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    {loading ? 'CADASTRANDO...' : 'CADASTRAR'}
                  </Button>

                  {/* Links de navegação */}
                  <div className="text-center mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">Já tem uma conta?</p>
                    <div className="flex justify-center items-center gap-4">
                      <Link 
                        href="/login"
                        className="text-[#2BE58F] hover:text-[#27CC7A] font-medium text-sm"
                      >
                        🔑 Fazer Login
                      </Link>
                      <span className="text-gray-400">|</span>
                      <Link 
                        href={tipoUsuario === "empresa" ? "/dashboard-empresa" : "/dashboard"}
                        className="text-[#2BE58F] hover:text-[#27CC7A] font-medium text-sm"
                      >
                        🚀 Pular para Dashboard
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
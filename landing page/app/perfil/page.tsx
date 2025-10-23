// app/perfil/page.tsx
"use client";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

export default function Perfil() {
  // Simular detecção do tipo de usuário (em produção viria do contexto/auth)
  const [tipoUsuario, setTipoUsuario] = useState<"prestador" | "empresa">("prestador");
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    logomarca: "",
    descritivo: "",
    servicosPrestados: "",
    redesSociais: "",
    experienciaSetor: "",
    // Campos específicos para empresas
    tipoEmpresa: "",
    localizacao: "",
    capacidade: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do perfil:", formData);
    alert("Perfil atualizado com sucesso!");
  };

  const dashboardLink = tipoUsuario === "empresa" ? "/dashboard-empresa" : "/dashboard";

  return (
    <main className="font-sans min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-6">
          <Link href="/" className="text-xl font-bold">
            LinkMe<span className="text-[#2BE58F]">Tur</span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 px-3 py-1 rounded text-xs font-medium text-green-800">
              {tipoUsuario === "prestador" ? "PRESTADOR DE SERVIÇOS" : "EMPRESA DE TURISMO"}
            </div>
            <Link 
              href={dashboardLink}
              className="text-gray-600 hover:text-gray-800 transition"
            >
              Dashboard
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

      {/* PERFIL */}
      <section className="py-16 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">PERFIL</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTipoUsuario("prestador")}
                  className={`px-3 py-1 rounded text-sm ${
                    tipoUsuario === "prestador" 
                      ? "bg-[#2BE58F] text-black" 
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  Prestador
                </button>
                <button
                  onClick={() => setTipoUsuario("empresa")}
                  className={`px-3 py-1 rounded text-sm ${
                    tipoUsuario === "empresa" 
                      ? "bg-[#2BE58F] text-black" 
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  Empresa
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* EDITAR DADOS */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4">EDITAR DADOS</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm text-gray-700 mb-1">
                      {tipoUsuario === "prestador" ? "Nome" : "Nome da Empresa"}
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                      placeholder={tipoUsuario === "prestador" ? "Seu nome" : "Nome da empresa"}
                    />
                  </div>
                  <div>
                    <label htmlFor="telefone" className="block text-sm text-gray-700 mb-1">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                      placeholder="Seu telefone"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                    placeholder="seu@email.com"
                  />
                </div>

                {/* Campos específicos para empresas */}
                {tipoUsuario === "empresa" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="tipoEmpresa" className="block text-sm text-gray-700 mb-1">
                          Tipo de Empresa
                        </label>
                        <select
                          id="tipoEmpresa"
                          name="tipoEmpresa"
                          value={formData.tipoEmpresa}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                        >
                          <option value="">Selecione...</option>
                          <option value="hotel">Hotel</option>
                          <option value="pousada">Pousada</option>
                          <option value="agencia">Agência de Viagens</option>
                          <option value="atrativo">Atrativo Turístico</option>
                          <option value="restaurante">Restaurante</option>
                          <option value="guia">Guia de Turismo</option>
                          <option value="transporte">Transporte</option>
                          <option value="outros">Outros</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="localizacao" className="block text-sm text-gray-700 mb-1">
                          Localização
                        </label>
                        <input
                          type="text"
                          id="localizacao"
                          name="localizacao"
                          value={formData.localizacao}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                          placeholder="Cidade, Estado"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* INSERIR LOGOMARCA E IMAGEM DE CAPA */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4">INSERIR LOGOMARCA E IMAGEM DE CAPA</h3>
                <div className="mb-4">
                  <label htmlFor="logomarca" className="block text-sm text-gray-700 mb-1">
                    Upload da logomarca
                  </label>
                  <input
                    type="file"
                    id="logomarca"
                    name="logomarca"
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* INSERIR DESCRITIVO */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4">
                  INSERIR DESCRITIVO - Sobre {tipoUsuario === "prestador" ? "o Prestador" : "a Empresa"} (texto)
                </h3>
                <div className="mb-4">
                  <textarea
                    id="descritivo"
                    name="descritivo"
                    value={formData.descritivo}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                    placeholder={
                      tipoUsuario === "prestador" 
                        ? "Descreva seus serviços e experiência..." 
                        : "Descreva sua empresa e o que oferece..."
                    }
                  />
                </div>
              </div>

              {/* INSERIR SERVIÇOS PRESTADOS ou NECESSIDADES */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4">
                  {tipoUsuario === "prestador" 
                    ? "INSERIR SERVIÇOS PRESTADOS (múltipla escolha)" 
                    : "PRINCIPAIS NECESSIDADES DE SERVIÇOS"
                  }
                </h3>
                <div className="mb-4">
                  <textarea
                    id="servicosPrestados"
                    name="servicosPrestados"
                    value={formData.servicosPrestados}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                    placeholder={
                      tipoUsuario === "prestador"
                        ? "Liste os serviços que você presta..."
                        : "Liste os tipos de serviços que costuma precisar..."
                    }
                  />
                </div>
              </div>

              {/* INSERIR REDES SOCIAIS */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4">INSERIR REDES SOCIAIS (link)</h3>
                <div className="mb-4">
                  <input
                    type="url"
                    id="redesSociais"
                    name="redesSociais"
                    value={formData.redesSociais}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                    placeholder="https://instagram.com/suaempresa"
                  />
                </div>
              </div>

              {/* POSSUI EXPERIÊNCIA NO SETOR DE TURISMO */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4">
                  {tipoUsuario === "prestador" 
                    ? "POSSUI EXPERIÊNCIA NO SETOR DE TURISMO (ou não)" 
                    : "TEMPO DE ATUAÇÃO NO TURISMO"
                  }
                </h3>
                <div className="mb-4">
                  <select
                    id="experienciaSetor"
                    name="experienciaSetor"
                    value={formData.experienciaSetor}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                  >
                    <option value="">Selecione...</option>
                    {tipoUsuario === "prestador" ? (
                      <>
                        <option value="sim">Sim, tenho experiência no setor de turismo</option>
                        <option value="nao">Não, não tenho experiência no setor de turismo</option>
                      </>
                    ) : (
                      <>
                        <option value="menos1">Menos de 1 ano</option>
                        <option value="1a3">1 a 3 anos</option>
                        <option value="3a5">3 a 5 anos</option>
                        <option value="5a10">5 a 10 anos</option>
                        <option value="mais10">Mais de 10 anos</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Botão Submit */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
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
                Salvar Perfil
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
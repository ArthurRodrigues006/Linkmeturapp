// app/cadastrar-servico/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

export default function Servicos() {
  const [activeTab, setActiveTab] = useState("cadastrar");
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    preco: "",
    prazo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Serviço cadastrado:", formData);
    alert("Serviço cadastrado com sucesso!");
  };

  return (
    <main className="font-sans min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-6">
          <Link href="/" className="text-xl font-bold">
            LinkMe<span className="text-[#2BE58F]">Tur</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard"
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

      {/* SERVIÇOS */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
              SERVIÇOS
            </h2>

            {/* Tabs */}
            <div className="flex border-b mb-8">
              <button
                onClick={() => setActiveTab("cadastrar")}
                className={`px-6 py-3 font-medium ${
                  activeTab === "cadastrar"
                    ? "border-b-2 border-[#2BE58F] text-[#2BE58F]"
                    : "text-gray-600"
                }`}
              >
                CADASTRAR SERVIÇO
              </button>
              <button
                onClick={() => setActiveTab("meus")}
                className={`px-6 py-3 font-medium ${
                  activeTab === "meus"
                    ? "border-b-2 border-[#2BE58F] text-[#2BE58F]"
                    : "text-gray-600"
                }`}
              >
                MEUS SERVIÇOS
              </button>
              <button
                onClick={() => setActiveTab("desafios")}
                className={`px-6 py-3 font-medium ${
                  activeTab === "desafios"
                    ? "border-b-2 border-[#2BE58F] text-[#2BE58F]"
                    : "text-gray-600"
                }`}
              >
                VER DESAFIOS/SERVIÇOS SOLICITADOS
              </button>
              <button
                onClick={() => setActiveTab("propostas")}
                className={`px-6 py-3 font-medium ${
                  activeTab === "propostas"
                    ? "border-b-2 border-[#2BE58F] text-[#2BE58F]"
                    : "text-gray-600"
                }`}
              >
                SUBMETER PROPOSTA
              </button>
            </div>

            {/* CADASTRAR SERVIÇO */}
            {activeTab === "cadastrar" && (
              <div>
                <p className="text-sm text-gray-600 mb-6">
                  (o prestador é quem denuncia nesse primeiro momento)
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4">Informações Básicas</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Nome do Serviço *</label>
                        <input
                          type="text"
                          name="titulo"
                          value={formData.titulo}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                          placeholder="Ex: Marketing Digital"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Categoria *</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none">
                          <option value="">Selecione...</option>
                          <option value="marketing">Marketing</option>
                          <option value="tecnologia">Tecnologia</option>
                          <option value="juridico">Jurídico</option>
                          <option value="contabilidade">Contabilidade</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm text-gray-700 mb-1">Descrição *</label>
                      <textarea
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                        placeholder="Descreva seu serviço..."
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 mb-4">Preços e Prazos</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Preço</label>
                        <input
                          type="text"
                          name="preco"
                          value={formData.preco}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                          placeholder="R$ 500,00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Prazo de Entrega</label>
                        <input
                          type="text"
                          name="prazo"
                          value={formData.prazo}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                          placeholder="Ex: 7 dias"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
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
                    Cadastrar Serviço
                  </Button>
                </form>
              </div>
            )}

            {/* MEUS SERVIÇOS */}
            {activeTab === "meus" && (
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Filtro de Busca por SERVIÇO</h3>
                <p className="text-gray-600 mb-4">Relação dos Serviços do Prestador (Prévia)</p>
                
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded">
                    <h4 className="font-medium">Marketing Digital</h4>
                    <p className="text-sm text-gray-600">Gestão de redes sociais e campanhas online</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500">R$ 800,00/mês</span>
                      <div className="space-x-2">
                        <button className="text-blue-600 text-sm">EDITAR/EXCLUIR</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VER DESAFIOS/SERVIÇOS SOLICITADOS */}
            {activeTab === "desafios" && (
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Filtro de Busca por CATEGORIA e SUBCATEGORIA (Outros)</h3>
                <p className="text-gray-600 mb-4">Relação dos Desafios Lançados (Prévia)</p>
                
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded">
                    <h4 className="font-medium">Preciso de site para minha pousada</h4>
                    <p className="text-sm text-gray-600">Categoria: Tecnologia | Subcategoria: Desenvolvimento Web</p>
                    <p className="text-sm text-gray-500 mt-2">Orçamento: R$ 2.000,00 | Prazo: 15 dias</p>
                    <div className="mt-3">
                      <button className="bg-[#2BE58F] text-black px-4 py-2 rounded text-sm font-medium">
                        SUBMETER PROPOSTA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUBMETER PROPOSTA */}
            {activeTab === "propostas" && (
              <div>
                <h3 className="font-bold text-gray-800 mb-4">SUBMETER PROPOSTA</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Preço</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                      placeholder="R$ 1.500,00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Prazo</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                      placeholder="10 dias"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Detalhes (campo aberto)</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                      placeholder="Descreva sua proposta..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Imagens modelo/Portfólio</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                    />
                  </div>

                  <Button
                    variant="contained"
                    size="large"
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
                    Enviar Proposta
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
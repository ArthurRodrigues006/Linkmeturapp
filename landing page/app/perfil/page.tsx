// app/perfil/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

export default function Perfil() {
  const [activeTab, setActiveTab] = useState("dados");
  const [isEditing, setIsEditing] = useState(false);
  const [userType] = useState<"empresa" | "prestador">("empresa"); // Simulando tipo do usuário
  
  const [profileData, setProfileData] = useState({
    nome: "João Silva",
    email: "joao@hotelfazenda.com",
    telefone: "(51) 99999-9999",
    empresa: "Hotel Fazenda Vale Verde",
    area: "hotel",
    descricao: "Hotel fazenda familiar localizado na Serra Gaúcha, especializado em turismo rural e experiências gastronômicas autênticas.",
    endereco: "Estrada Rural, 123 - Gramado/RS",
    site: "www.hotelfazendavaleverde.com.br",
    instagram: "@hotelfazendavaleverde",
    linkedin: "hotel-fazenda-vale-verde",
    foto: "/placeholder-avatar.jpg"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log("Salvando dados:", profileData);
    setIsEditing(false);
    // Aqui você faria a chamada para a API
  };

  const completionPercentage = () => {
    const fields = Object.values(profileData);
    const filledFields = fields.filter(field => field && field.trim() !== "").length;
    return Math.round((filledFields / fields.length) * 100);
  };

  return (
    <main className="font-sans min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <Link href="/" className="text-xl font-bold">
            LinkMe<span className="text-[#2BE58F]">Tur</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 transition">Dashboard</Link>
            <Link href="/buscar" className="text-gray-600 hover:text-gray-800 transition">Buscar</Link>
            <Link href="/mensagens" className="text-gray-600 hover:text-gray-800 transition">Mensagens</Link>
            <Link href="/perfil" className="text-[#2BE58F] font-medium">Perfil</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden md:block">
              <div className="text-sm font-medium text-gray-800">{profileData.nome}</div>
              <div className="text-xs text-gray-600">{profileData.empresa}</div>
            </div>
            <div className="w-10 h-10 bg-[#2BE58F] rounded-full flex items-center justify-center text-black font-bold">
              {profileData.nome.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-[#2BE58F] rounded-full flex items-center justify-center text-black font-bold text-2xl mx-auto mb-4">
                  {profileData.nome.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{profileData.nome}</h2>
                <p className="text-gray-600">{profileData.empresa}</p>
                <div className="mt-4">
                  <div className="text-sm text-gray-600 mb-2">Perfil completo</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#2BE58F] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage()}%` }}
                    ></div>
                  </div>
                  <div className="text-sm font-medium text-[#2BE58F] mt-1">{completionPercentage()}%</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-xl shadow-sm border">
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab("dados")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === "dados" 
                      ? "bg-[#2BE58F] text-black font-medium" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  📋 Dados Pessoais
                </button>
                <button
                  onClick={() => setActiveTab("empresa")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === "empresa" 
                      ? "bg-[#2BE58F] text-black font-medium" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  🏢 Informações da Empresa
                </button>
                <button
                  onClick={() => setActiveTab("portfolio")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === "portfolio" 
                      ? "bg-[#2BE58F] text-black font-medium" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  📁 Portfólio
                </button>
                <button
                  onClick={() => setActiveTab("configuracoes")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === "configuracoes" 
                      ? "bg-[#2BE58F] text-black font-medium" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  ⚙️ Configurações
                </button>
              </nav>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border p-8">
              
              {/* Header with Edit Button */}
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                  {activeTab === "dados" && "Dados Pessoais"}
                  {activeTab === "empresa" && "Informações da Empresa"}
                  {activeTab === "portfolio" && "Portfólio"}
                  {activeTab === "configuracoes" && "Configurações"}
                </h1>
                
                {(activeTab === "dados" || activeTab === "empresa") && (
                  <div className="flex space-x-3">
                    {isEditing ? (
                      <>
                        <Button
                          onClick={() => setIsEditing(false)}
                          variant="outlined"
                          sx={{
                            borderColor: "#gray-300",
                            color: "gray",
                            "&:hover": { borderColor: "#gray-400" },
                            textTransform: "none",
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleSave}
                          variant="contained"
                          sx={{
                            backgroundColor: CTA_BG,
                            color: "black",
                            "&:hover": { backgroundColor: CTA_HOVER },
                            textTransform: "none",
                          }}
                        >
                          Salvar
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="contained"
                        sx={{
                          backgroundColor: CTA_BG,
                          color: "black",
                          "&:hover": { backgroundColor: CTA_HOVER },
                          textTransform: "none",
                        }}
                      >
                        Editar
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* DADOS PESSOAIS TAB */}
              {activeTab === "dados" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        name="nome"
                        value={profileData.nome}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg transition ${
                          isEditing 
                            ? "border-gray-300 focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent" 
                            : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg transition ${
                          isEditing 
                            ? "border-gray-300 focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent" 
                            : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone/WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="telefone"
                        value={profileData.telefone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg transition ${
                          isEditing 
                            ? "border-gray-300 focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent" 
                            : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Área de Atuação
                      </label>
                      <select
                        name="area"
                        value={profileData.area}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg transition ${
                          isEditing 
                            ? "border-gray-300 focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent" 
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <option value="hotel">Hotel/Pousada</option>
                        <option value="agencia">Agência de Viagens</option>
                        <option value="atrativo">Atrativo Turístico</option>
                        <option value="restaurante">Restaurante</option>
                        <option value="transporte">Transporte</option>
                        <option value="guia">Guia de Turismo</option>
                        <option value="eventos">Eventos</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* EMPRESA TAB */}
              {activeTab === "empresa" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome da Empresa
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        value={profileData.empresa}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg transition ${
                          isEditing 
                            ? "border-gray-300 focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent" 
                            : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Endereço
                      </label>
                      <input
                        type="text"
                        name="endereco"
                        value={profileData.endereco}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg transition ${
                          isEditing 
                            ? "border-gray-300 focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent" 
                            : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site
                      </label>
                      <input
                        type="url"
                        name="site"
                        value={profileData.site}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg transition ${
                          isEditing 
                            ? "border-gray-300 focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent" 
                            : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram
                      </label>
                      <input
                        type="text"
                        name="instagram"
                        value={profileData.instagram}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg transition ${
                          isEditing 
                            ? "border-gray-300 focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent" 
                            : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição da Empresa
                      </label>
                      <textarea
                        name="descricao"
                        value={profileData.descricao}
                        onChange={handleChange}
                        disabled={!isEditing}
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-lg transition resize-none ${
                          isEditing 
                            ? "border-gray-300 focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent" 
                            : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PORTFOLIO TAB */}
              {activeTab === "portfolio" && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Adicione fotos do seu negócio</h3>
                    <p className="text-gray-600 mb-6">Mostre seus espaços, serviços e experiências para atrair mais clientes</p>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: CTA_BG,
                        color: "black",
                        "&:hover": { backgroundColor: CTA_HOVER },
                        textTransform: "none",
                      }}
                    >
                      Adicionar Fotos
                    </Button>
                  </div>
                </div>
              )}

              {/* CONFIGURAÇÕES TAB */}
              {activeTab === "configuracoes" && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Notificações</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-[#2BE58F] border-gray-300 rounded focus:ring-[#2BE58F]" defaultChecked />
                        <span className="ml-3 text-sm text-gray-700">Receber notificações por email</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-[#2BE58F] border-gray-300 rounded focus:ring-[#2BE58F]" defaultChecked />
                        <span className="ml-3 text-sm text-gray-700">Notificações de novas mensagens</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-[#2BE58F] border-gray-300 rounded focus:ring-[#2BE58F]" />
                        <span className="ml-3 text-sm text-gray-700">Newsletter semanal</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacidade</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-[#2BE58F] border-gray-300 rounded focus:ring-[#2BE58F]" defaultChecked />
                        <span className="ml-3 text-sm text-gray-700">Perfil público na plataforma</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-[#2BE58F] border-gray-300 rounded focus:ring-[#2BE58F]" defaultChecked />
                        <span className="ml-3 text-sm text-gray-700">Permitir contato direto</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Conta</h3>
                    <div className="space-y-3">
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: "#2BE58F",
                          color: "#2BE58F",
                          "&:hover": { borderColor: "#27CC7A", backgroundColor: "#f0fdf4" },
                          textTransform: "none",
                        }}
                      >
                        Alterar Senha
                      </Button>
                      <br />
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: "#ef4444",
                          color: "#ef4444",
                          "&:hover": { borderColor: "#dc2626", backgroundColor: "#fef2f2" },
                          textTransform: "none",
                        }}
                      >
                        Desativar Conta
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

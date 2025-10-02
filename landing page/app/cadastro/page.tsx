// app/cadastro/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    tipo: "", // empresa ou prestador
    area: "",
    descricao: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    // Simulando cadastro bem-sucedido
    alert("Cadastro realizado com sucesso! Redirecionando para o dashboard...");
    // Redirecionar para dashboard após cadastro
    window.location.href = "/dashboard";
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

      {/* AVISO BETA */}
      <section className="py-6 bg-blue-50 border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex items-start justify-center text-blue-800">
            <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">🚀 Versão Beta - Teste a Plataforma</h3>
              <p className="text-sm md:text-base">
                <strong>Bem-vindo à versão de testes da LinkMe Tur!</strong><br/>
                Complete seu cadastro para explorar todas as funcionalidades da plataforma.<br/>
                <span className="text-blue-900 font-medium">Seus dados são apenas para demonstração e não serão armazenados.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HERO SECTION */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Faça parte da transformação do turismo gaúcho!
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Cadastre-se gratuitamente e seja um dos primeiros a testar nossa plataforma
          </p>
        </div>
      </section>

      {/* FORMULÁRIO DE CADASTRO */}
      <section className="py-16 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Cadastro LinkMe Tur
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tipo de Cadastro */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Você é: *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="tipo"
                      value="empresa"
                      checked={formData.tipo === "empresa"}
                      onChange={handleChange}
                      className="mr-3"
                      required
                    />
                    <div>
                      <div className="font-semibold">Empresa de Turismo</div>
                      <div className="text-sm text-gray-600">Hotel, agência, atrativo, etc.</div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="tipo"
                      value="prestador"
                      checked={formData.tipo === "prestador"}
                      onChange={handleChange}
                      className="mr-3"
                      required
                    />
                    <div>
                      <div className="font-semibold">Prestador de Serviços</div>
                      <div className="text-sm text-gray-600">Marketing, tecnologia, etc.</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Nome */}
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                  placeholder="Seu nome completo"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                  placeholder="seu@email.com"
                />
              </div>

              {/* Telefone */}
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone/WhatsApp *
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                  placeholder="(51) 99999-9999"
                />
              </div>

              {/* Empresa */}
              <div>
                <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da empresa/negócio *
                </label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                  placeholder="Nome da sua empresa"
                />
              </div>

              {/* Área de Atuação */}
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                  Área de atuação *
                </label>
                <select
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                >
                  <option value="">Selecione sua área</option>
                  
                  {formData.tipo === "empresa" && (
                    <>
                      <option value="hotel">Hotel/Pousada</option>
                      <option value="agencia">Agência de Viagens</option>
                      <option value="atrativo">Atrativo Turístico</option>
                      <option value="restaurante">Restaurante</option>
                      <option value="transporte">Transporte</option>
                      <option value="guia">Guia de Turismo</option>
                      <option value="eventos">Eventos</option>
                      <option value="outro-empresa">Outro</option>
                    </>
                  )}
                  
                  {formData.tipo === "prestador" && (
                    <>
                      <option value="marketing">Marketing</option>
                      <option value="tecnologia">Tecnologia</option>
                      <option value="juridico">Jurídico</option>
                      <option value="contabilidade">Contabilidade</option>
                      <option value="design">Design</option>
                      <option value="consultoria">Consultoria</option>
                      <option value="treinamento">Treinamento</option>
                      <option value="sustentabilidade">Sustentabilidade/ESG</option>
                      <option value="inovacao">Inovação</option>
                      <option value="outro-prestador">Outro</option>
                    </>
                  )}
                </select>
              </div>

              {/* Descrição */}
              <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
                  Conte um pouco sobre seu negócio
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition resize-none"
                  placeholder="Descreva brevemente seu negócio, serviços oferecidos, localização, etc."
                />
              </div>

              {/* Botão Submit */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    backgroundColor: CTA_BG,
                    color: "black",
                    "&:hover": { backgroundColor: CTA_HOVER },
                    py: 2,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                  }}
                >
                  Cadastrar e Fazer Parte da LinkMe Tur
                </Button>
              </div>

              <p className="text-sm text-gray-600 text-center mt-4">
                Ao se cadastrar, você receberá acesso prioritário ao MVP e updates sobre o desenvolvimento da plataforma.
              </p>

              {/* Botão para pular cadastro */}
              <div className="text-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Ou para testar rapidamente:</p>
                <Link 
                  href="/dashboard"
                  className="inline-flex items-center px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                >
                  🚀 Ir direto para o Dashboard
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-gray-900 text-white text-center px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-xl font-bold mb-4">
            LinkMe<span className="text-[#2BE58F]">Tur</span>
          </div>
          <p className="text-gray-400">
            Conectamos quem precisa com quem resolve no turismo gaúcho
          </p>
        </div>
      </footer>
    </main>
  );
}

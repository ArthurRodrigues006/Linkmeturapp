// app/buscar/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

// Dados simulados para demonstração
const mockResults = [
  {
    id: 1,
    nome: "Maria Santos Marketing",
    tipo: "prestador",
    area: "Marketing Digital",
    descricao: "Especialista em marketing digital para o setor turístico com mais de 8 anos de experiência.",
    localizacao: "Porto Alegre, RS",
    avaliacao: 4.8,
    projetos: 47,
    preco: "R$ 80-120/hora",
    tags: ["SEO", "Redes Sociais", "Google Ads", "Turismo"],
    foto: "MS"
  },
  {
    id: 2,
    nome: "TechSolutions RS",
    tipo: "prestador",
    area: "Tecnologia",
    descricao: "Desenvolvimento de sites e sistemas para empresas de turismo. Especialistas em reservas online.",
    localizacao: "Gramado, RS",
    avaliacao: 4.9,
    projetos: 32,
    preco: "R$ 150-200/hora",
    tags: ["Desenvolvimento Web", "Sistemas", "E-commerce", "Reservas"],
    foto: "TS"
  },
  {
    id: 3,
    nome: "Hotel Fazenda Recanto",
    tipo: "empresa",
    area: "Hospedagem",
    descricao: "Hotel fazenda familiar na região da Serra Gaúcha, oferecendo experiências rurais autênticas.",
    localizacao: "Canela, RS",
    avaliacao: 4.7,
    projetos: 0,
    preco: "",
    tags: ["Turismo Rural", "Família", "Gastronomia", "Natureza"],
    foto: "HR"
  },
  {
    id: 4,
    nome: "Consultoria Jurídica Turismo",
    tipo: "prestador",
    area: "Jurídico",
    descricao: "Assessoria jurídica especializada em direito do turismo, licenças e regulamentações.",
    localizacao: "Caxias do Sul, RS",
    avaliacao: 4.6,
    projetos: 28,
    preco: "R$ 200-300/hora",
    tags: ["Direito Turístico", "Licenças", "Contratos", "Regulamentação"],
    foto: "CJ"
  }
];

export default function Buscar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedLocalizacao, setSelectedLocalizacao] = useState("");
  const [results, setResults] = useState(mockResults);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleSearch = () => {
    let filtered = mockResults;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedArea) {
      filtered = filtered.filter(item => item.area === selectedArea);
    }

    if (selectedTipo) {
      filtered = filtered.filter(item => item.tipo === selectedTipo);
    }

    if (selectedLocalizacao) {
      filtered = filtered.filter(item => 
        item.localizacao.toLowerCase().includes(selectedLocalizacao.toLowerCase())
      );
    }

    setResults(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedArea("");
    setSelectedTipo("");
    setSelectedLocalizacao("");
    setResults(mockResults);
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
            <Link href="/buscar" className="text-[#2BE58F] font-medium">Buscar</Link>
            <Link href="/mensagens" className="text-gray-600 hover:text-gray-800 transition">Mensagens</Link>
            <Link href="/perfil" className="text-gray-600 hover:text-gray-800 transition">Perfil</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-[#2BE58F] rounded-full flex items-center justify-center text-black font-bold">
              J
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        
        {/* SEARCH HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Encontre o parceiro ideal para seu negócio
          </h1>
          <p className="text-gray-600">
            Descubra prestadores de serviços qualificados e empresas do turismo gaúcho
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* FILTERS SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Filtros</h2>
              
              {/* Search Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar por palavra-chave
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ex: marketing, hotel, tecnologia..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                />
              </div>

              {/* Tipo */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo
                </label>
                <select
                  value={selectedTipo}
                  onChange={(e) => setSelectedTipo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                >
                  <option value="">Todos</option>
                  <option value="empresa">Empresas de Turismo</option>
                  <option value="prestador">Prestadores de Serviços</option>
                </select>
              </div>

              {/* Área */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área de Atuação
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                >
                  <option value="">Todas as áreas</option>
                  <option value="Marketing Digital">Marketing Digital</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Jurídico">Jurídico</option>
                  <option value="Contabilidade">Contabilidade</option>
                  <option value="Design">Design</option>
                  <option value="Hospedagem">Hospedagem</option>
                  <option value="Gastronomia">Gastronomia</option>
                  <option value="Transporte">Transporte</option>
                </select>
              </div>

              {/* Localização */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização
                </label>
                <input
                  type="text"
                  value={selectedLocalizacao}
                  onChange={(e) => setSelectedLocalizacao(e.target.value)}
                  placeholder="Ex: Porto Alegre, Gramado..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleSearch}
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: CTA_BG,
                    color: "black",
                    "&:hover": { backgroundColor: CTA_HOVER },
                    py: 2,
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Buscar
                </Button>
                
                <Button
                  onClick={clearFilters}
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: "#gray-300",
                    color: "gray",
                    "&:hover": { borderColor: "#gray-400", backgroundColor: "#f9fafb" },
                    py: 2,
                    textTransform: "none",
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div className="lg:col-span-3">
            
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Ordenado por relevância
                </p>
              </div>
              
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded-md transition ${
                    viewMode === "grid" 
                      ? "bg-white shadow-sm text-gray-800" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded-md transition ${
                    viewMode === "list" 
                      ? "bg-white shadow-sm text-gray-800" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Results Grid/List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
              {results.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer">
                  <div className="p-6">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#2BE58F] rounded-full flex items-center justify-center text-black font-bold">
                          {item.foto}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{item.nome}</h3>
                          <p className="text-sm text-gray-600">{item.area}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">{item.avaliacao}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.descricao}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center space-x-1 mb-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span>{item.localizacao}</span>
                        </div>
                        {item.tipo === "prestador" && (
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span>{item.projetos} projetos</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: "#2BE58F",
                            color: "#2BE58F",
                            "&:hover": { borderColor: "#27CC7A", backgroundColor: "#f0fdf4" },
                            textTransform: "none",
                            fontSize: "0.75rem",
                          }}
                        >
                          Ver Perfil
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            backgroundColor: CTA_BG,
                            color: "black",
                            "&:hover": { backgroundColor: CTA_HOVER },
                            textTransform: "none",
                            fontSize: "0.75rem",
                          }}
                        >
                          Contatar
                        </Button>
                      </div>
                    </div>

                    {/* Price for prestadores */}
                    {item.tipo === "prestador" && item.preco && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="text-sm">
                          <span className="text-gray-600">A partir de </span>
                          <span className="font-semibold text-[#2BE58F]">{item.preco}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {results.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhum resultado encontrado</h3>
                <p className="text-gray-600 mb-4">Tente ajustar seus filtros ou usar termos diferentes</p>
                <Button
                  onClick={clearFilters}
                  variant="contained"
                  sx={{
                    backgroundColor: CTA_BG,
                    color: "black",
                    "&:hover": { backgroundColor: CTA_HOVER },
                    textTransform: "none",
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

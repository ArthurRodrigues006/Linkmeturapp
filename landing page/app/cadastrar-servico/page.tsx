// app/cadastrar-servico/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

export default function CadastrarServico() {
  const [tipoPublicacao, setTipoPublicacao] = useState<"oferecer" | "procurar">("oferecer");
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    subcategoria: "",
    descricao: "",
    preco: "",
    tipoPreco: "fixo", // fixo, por_hora, negociavel
    localizacao: "",
    prazo: "",
    requisitos: "",
    tags: "",
    contato: {
      whatsapp: "",
      email: "",
      site: ""
    }
  });

  const categorias = {
    marketing: [
      "Marketing Digital",
      "Redes Sociais",
      "SEO/SEM",
      "Design Gráfico",
      "Fotografia",
      "Vídeo Marketing",
      "Branding",
      "Copywriting"
    ],
    tecnologia: [
      "Desenvolvimento Web",
      "Aplicativos Mobile",
      "E-commerce",
      "Sistemas de Reserva",
      "Automação",
      "Suporte Técnico",
      "Hospedagem",
      "Segurança Digital"
    ],
    juridico: [
      "Direito Turístico",
      "Contratos",
      "Licenças e Alvarás",
      "Propriedade Intelectual",
      "Trabalhista",
      "Tributário",
      "Ambiental",
      "Consultoria Jurídica"
    ],
    contabilidade: [
      "Contabilidade Geral",
      "Planejamento Tributário",
      "Folha de Pagamento",
      "Auditoria",
      "Consultoria Financeira",
      "Declarações",
      "Controle Fiscal",
      "Análise Financeira"
    ],
    consultoria: [
      "Gestão Hoteleira",
      "Turismo Sustentável",
      "Experiência do Cliente",
      "Operações Turísticas",
      "Estratégia de Negócios",
      "Qualidade de Serviço",
      "Treinamento",
      "Inovação"
    ],
    outros: [
      "Tradução",
      "Arquitetura/Design",
      "Engenharia",
      "Segurança",
      "Limpeza",
      "Manutenção",
      "Transporte",
      "Outros Serviços"
    ]
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('contato.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contato: {
          ...prev.contato,
          [contactField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do serviço:", { tipoPublicacao, ...formData });
    alert(`${tipoPublicacao === "oferecer" ? "Serviço" : "Demanda"} cadastrado com sucesso! Redirecionando para o dashboard...`);
    window.location.href = "/dashboard";
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
            <Link href="/perfil" className="text-gray-600 hover:text-gray-800 transition">Perfil</Link>
          </nav>

          <Link 
            href="/dashboard"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            ← Voltar ao Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-8">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Cadastrar Serviço ou Demanda
          </h1>
          <p className="text-gray-600">
            Publique seu serviço ou procure por soluções para seu negócio
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-8">
          
          {/* TIPO DE PUBLICAÇÃO */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">O que você deseja fazer?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`flex items-center p-6 border-2 rounded-xl cursor-pointer transition ${
                tipoPublicacao === "oferecer" 
                  ? "border-[#2BE58F] bg-green-50" 
                  : "border-gray-200 hover:border-gray-300"
              }`}>
                <input
                  type="radio"
                  name="tipoPublicacao"
                  value="oferecer"
                  checked={tipoPublicacao === "oferecer"}
                  onChange={(e) => setTipoPublicacao(e.target.value as "oferecer" | "procurar")}
                  className="mr-4"
                />
                <div>
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="font-semibold text-lg text-gray-800">Oferecer Serviço</div>
                  <div className="text-sm text-gray-600">Sou prestador e quero oferecer meus serviços</div>
                </div>
              </label>

              <label className={`flex items-center p-6 border-2 rounded-xl cursor-pointer transition ${
                tipoPublicacao === "procurar" 
                  ? "border-[#2BE58F] bg-green-50" 
                  : "border-gray-200 hover:border-gray-300"
              }`}>
                <input
                  type="radio"
                  name="tipoPublicacao"
                  value="procurar"
                  checked={tipoPublicacao === "procurar"}
                  onChange={(e) => setTipoPublicacao(e.target.value as "oferecer" | "procurar")}
                  className="mr-4"
                />
                <div>
                  <div className="text-2xl mb-2">🔍</div>
                  <div className="font-semibold text-lg text-gray-800">Procurar Serviço</div>
                  <div className="text-sm text-gray-600">Preciso de um serviço para minha empresa</div>
                </div>
              </label>
            </div>
          </div>

          {/* FORMULÁRIO */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {tipoPublicacao === "oferecer" ? "Título do Serviço" : "Título da Demanda"} *
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                placeholder={tipoPublicacao === "oferecer" 
                  ? "Ex: Criação de site responsivo para hotéis" 
                  : "Ex: Preciso de marketing digital para minha pousada"
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
              />
            </div>

            {/* Categoria e Subcategoria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria *
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="marketing">Marketing</option>
                  <option value="tecnologia">Tecnologia</option>
                  <option value="juridico">Jurídico</option>
                  <option value="contabilidade">Contabilidade</option>
                  <option value="consultoria">Consultoria</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategoria *
                </label>
                <select
                  name="subcategoria"
                  value={formData.subcategoria}
                  onChange={handleChange}
                  required
                  disabled={!formData.categoria}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition disabled:bg-gray-100"
                >
                  <option value="">Selecione uma subcategoria</option>
                  {formData.categoria && categorias[formData.categoria as keyof typeof categorias]?.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição Detalhada *
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
                rows={5}
                placeholder={tipoPublicacao === "oferecer" 
                  ? "Descreva detalhadamente o serviço que você oferece, sua experiência, metodologia, etc."
                  : "Descreva o que você precisa, objetivos, prazo, orçamento estimado, etc."
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {/* Preço e Localização */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {tipoPublicacao === "oferecer" ? "Preço" : "Orçamento"}
                </label>
                <input
                  type="text"
                  name="preco"
                  value={formData.preco}
                  onChange={handleChange}
                  placeholder="Ex: R$ 2.500"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Preço
                </label>
                <select
                  name="tipoPreco"
                  value={formData.tipoPreco}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                >
                  <option value="fixo">Preço Fixo</option>
                  <option value="por_hora">Por Hora</option>
                  <option value="negociavel">Negociável</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização
                </label>
                <input
                  type="text"
                  name="localizacao"
                  value={formData.localizacao}
                  onChange={handleChange}
                  placeholder="Ex: Porto Alegre, RS"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Prazo e Requisitos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {tipoPublicacao === "oferecer" ? "Prazo de Entrega" : "Prazo Desejado"}
                </label>
                <input
                  type="text"
                  name="prazo"
                  value={formData.prazo}
                  onChange={handleChange}
                  placeholder="Ex: 15 dias úteis"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (separadas por vírgula)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Ex: wordpress, responsivo, seo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Requisitos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {tipoPublicacao === "oferecer" ? "Requisitos do Cliente" : "Requisitos Específicos"}
              </label>
              <textarea
                name="requisitos"
                value={formData.requisitos}
                onChange={handleChange}
                rows={3}
                placeholder={tipoPublicacao === "oferecer" 
                  ? "O que você precisa do cliente para realizar o trabalho?"
                  : "Requisitos específicos, experiência necessária, certificações, etc."
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {/* Contato */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações de Contato</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="contato.whatsapp"
                    value={formData.contato.whatsapp}
                    onChange={handleChange}
                    placeholder="(51) 99999-9999"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="contato.email"
                    value={formData.contato.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site/Portfólio
                  </label>
                  <input
                    type="url"
                    name="contato.site"
                    value={formData.contato.site}
                    onChange={handleChange}
                    placeholder="www.seusite.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex space-x-4 pt-6">
              <Link
                href="/dashboard"
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition text-center"
              >
                Cancelar
              </Link>
              
              <Button
                type="submit"
                variant="contained"
                sx={{
                  flex: 2,
                  backgroundColor: CTA_BG,
                  color: "black",
                  "&:hover": { backgroundColor: CTA_HOVER },
                  py: 2,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                {tipoPublicacao === "oferecer" ? "Publicar Serviço" : "Publicar Demanda"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

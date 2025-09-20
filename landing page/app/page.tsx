// src/app/landing/page.tsx
import Image from "next/image";
import { Button } from "@mui/material";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

export default function Landing() {
  return (
    <main className="font-sans">
      {/* NAVBAR */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-6">
          {/* <Image
            src="/logo-linkmetur.jpeg"
            alt="LinkMe Tur"
            width={160}
            height={45}
            priority
          /> */}
          <div className="text-xl font-bold">LinkMe<span className="text-[#2BE58F]">Tur</span></div>
          <nav className="hidden md:flex space-x-10 text-gray-800 text-lg">
            {[
              "O que é",
              "Para quem",
              "Vantagens",
              "Perguntas Frequentes",
              "Evento",
              "Contato",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:text-black transition"
              >
                {item}
              </a>
            ))}
          </nav>
          <Button
            href="#contato"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: CTA_BG,
              color: "black",
              "&:hover": { backgroundColor: CTA_HOVER },
              px: 6,
              py: 1.5,
              borderRadius: "9999px",
              textTransform: "none",
            }}
          >
            Fazer parte
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative h-screen w-full pt-24 bg-gradient-to-r from-blue-600 to-green-600">
        {/* <Image
          src="/hero.jpg"
          alt="Banner Hero"
          fill
          className="object-cover"
          priority
        /> */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center px-8 lg:px-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              Transformamos a forma como as empresas fazem negócios com o turismo
            </h1>
            <p className="text-lg md:text-xl text-white mb-8">
              Conectamos quem precisa com quem resolve
            </p>
            <Button
              href="#contato"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: CTA_BG,
                color: "black",
                "&:hover": { backgroundColor: CTA_HOVER },
                px: 8,
                py: 2,
                borderRadius: "9999px",
                textTransform: "none",
              }}
            >
              Quero fazer parte dessa transformação
            </Button>
          </div>
        </div>
      </section>

      {/* O QUE É */}
      <section id="o-que-é" className="py-16 bg-white text-center px-8">
        <h2 className="text-3xl font-bold mb-4 inline-block px-4 text-black">
          Conecte-se com quem
          <br />
          realmente importa
        </h2>
        <div className="h-1 w-24 bg-[#2BE58F] mx-auto mb-8 rounded" />

        <p className="max-w-3xl mx-auto text-gray-700 mb-4">
          Não somos apenas uma plataforma, somos um ecossistema, que conecta
          empresas de turismo a prestadores de serviços especializados e
          qualificados.
        </p>
        <p className="max-w-3xl mx-auto text-gray-700 mb-4">
          Unimos quem vive o turismo na prática com quem tem as soluções certas
          para impulsionar esse setor: profissionais de marketing, tecnologia,
          jurídico, contabilidade, sustentabilidade, inovação e muito mais.
        </p>
        <p className="max-w-3xl mx-auto text-gray-700 mb-8">
          Valorizamos os prestadores de serviço como peças-chave da engrenagem
          do turismo. Eles não são apenas fornecedores, são parceiros
          estratégicos para o desenvolvimento dos destinos. E nós acreditamos
          que fortalecer os bastidores do turismo é essencial para que os
          destinos brilhem.
        </p>

        <h3 className="text-2xl font-bold mb-8 text-black">
          Na LinkMe Tur você encontra os parceiros certos, de forma rápida,
          simples e eficiente
        </h3>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-6 bg-gray-50 rounded-2xl shadow text-center">
            {/* <Image
              src="/141.png"
              alt="Ícone Empresas do Trade Turístico"
              width={75}
              height={70}
              className="mx-auto mb-4"
            /> */}
            <div className="w-[75px] h-[70px] bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center text-gray-600">141</div>
            <h4 className="font-semibold mb-2 text-black">
              Empresas do Trade Turístico
            </h4>
            <p className="text-gray-600">
              Encontre prestadores de serviços confiáveis com agilidade, reduza
              custos e modernize seu negócio com soluções sob medida.
            </p>
          </div>
          {/* Card 2 */}
          <div className="p-6 bg-gray-50 rounded-2xl shadow text-center">
            {/* <Image
              src="/142.png"
              alt="Ícone Prestadores de Serviços"
              width={70}
              height={70}
              className="mx-auto mb-4"
            /> */}
            <div className="w-[70px] h-[70px] bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center text-gray-600">142</div>
            <h4 className="font-semibold mb-2 text-black">
              Prestadores de Serviços
            </h4>
            <p className="text-gray-600">
              Ganhe visibilidade, acesse clientes qualificados do turismo e
              aumente suas oportunidades de negócio com menos esforço.
            </p>
          </div>
          {/* Card 3 */}
          <div className="p-6 bg-gray-50 rounded-2xl shadow text-center">
            {/* <Image
              src="/143.png"
              alt="Ícone Para o Mercado e os Turistas"
              width={70}
              height={70}
              className="mx-auto mb-4"
            /> */}
            <div className="w-[70px] h-[70px] bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center text-gray-600">143</div>
            <h4 className="font-semibold mb-2 text-black">
              Para o Mercado e os Turistas
            </h4>
            <p className="text-gray-600">
              Fortalecemos os bastidores do turismo para que os destinos
              ofereçam experiências mais autênticas, sustentáveis e
              encantadoras.
            </p>
          </div>
        </div>
      </section>

      {/* PARA QUEM */}
      <section id="para-quem" className="py-16 px-8 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4 text-black">
          Para quem é a LinkMe Tur?
        </h2>
        <div className="h-1 w-24 bg-[#2BE58F] mx-auto mb-8 rounded" />

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Card: empresas */}
          <div className="p-6 bg-gray-50 rounded-2xl shadow text-left">
            {/* <Image
              src="/141.png"
              alt="Ícone Empresas do Turismo"
              width={75}
              height={75}
              className="mx-auto mb-4"
            /> */}
            <div className="w-[75px] h-[75px] bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center text-gray-600">141</div>
            <h3 className="text-xl font-semibold mb-2 text-black">
              Para empresas do turismo
            </h3>
            <p className="text-gray-600 mb-4">
              Empresas do Trade Turístico: (Meios de hospedagem, agências,
              atrativos, guias, restaurantes, eventos, transporte e produtores
              locais)
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Encontre prestadores de serviços qualificados em minutos</li>
              <li>Reduza custos e tempo na contratação</li>
              <li>Compare avaliações de prestadores e reduza riscos</li>
              <li>Acesse soluções sob medida para crescer com eficiência</li>
            </ul>
          </div>
          {/* Card: prestadores */}
          <div className="p-6 bg-gray-50 rounded-2xl shadow text-left">
            {/* <Image
              src="/144.png"
              alt="Ícone Prestadores de Serviço"
              width={70}
              height={70}
              className="mx-auto mb-4"
            /> */}
            <div className="w-[70px] h-[70px] bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center text-gray-600">144</div>
            <h3 className="text-xl font-semibold mb-2 text-black">
              Para prestadores de serviço
            </h3>
            <p className="text-gray-600 mb-4">
              Prestadores de Serviços: (Marketing, tecnologia, jurídico,
              contabilidade, ESG, inovação e mais)
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                Ganhe visibilidade e conecte-se com empresas do setor turístico
              </li>
              <li>Reduza o tempo e os custos na captação de clientes</li>
              <li>
                Conecte-se a oportunidades reais e que precisam dos seus
                serviços
              </li>
              <li>
                Destaque-se em uma plataforma que valoriza a qualidade e a
                inovação
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* VANTAGENS */}
      <section id="vantagens" className="py-16 bg-gray-50 text-center px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="mt-12 text-3xl md:text-4xl font-bold text-black">
            Quer fazer parte da transformação do turismo gaúcho?
            <br />
            Então essa oportunidade é pra você!
          </h2>
          <div className="mt-4 h-1 w-24 bg-[#2BE58F] rounded" />
          <p className="mt-6 max-w-3xl text-gray-700">
            Estamos construindo a LinkMe Tur ouvindo quem realmente faz
            acontecer todos os dias, VOCÊ! Ajude-nos a moldar uma plataforma
            feita sob medida para as necessidades reais do mercado e do seu
            negócio, veja como você ganha ao fazer parte da LinkMe Tur:
          </p>
          <div className="mt-10 w-full">
            {/* <Image
              src="/nova.png"
              alt="Benefícios do ecossistema LinkMe Tur"
              width={1600}
              height={800}
              className="mx-auto object-contain"
              priority
            /> */}
            <div className="w-full h-[400px] bg-gray-200 rounded-lg mx-auto flex items-center justify-center text-gray-600 text-xl">Imagem dos Benefícios</div>
          </div>
        </div>
      </section>

      {/* TURISMO MAIS FORTE */}
      <section id="forte" className="py-16 bg-white text-center px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Vamos juntos construir um turismo mais forte,
          <br />
          conectado, moderno e cheio de novas oportunidades para todos!
        </h2>
        <div className="mt-4 h-1 w-24 bg-[#2BE58F] mx-auto rounded" />
        <div className="mt-12 max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
          <p className="text-3xl md:text-4xl font-bold text-black mb-6 leading-snug text-left">
            O turismo gaúcho precisa de quem acredita no seu futuro, e esse
            futuro <span className="text-[#2BE58F]">começa agora!</span>
          </p>
          <div className="flex justify-center">
            {/* <Image
              src="/mockup-app.png"
              alt="Mockup do App LinkMe Tur"
              width={800}
              height={800}
              className="max-w-full h-auto"
              priority
            /> */}
            <div className="w-[400px] h-[400px] bg-gray-200 rounded-lg mx-auto flex items-center justify-center text-gray-600 text-lg">Mockup App</div>
          </div>
        </div>
      </section>

      {/* EVENTO */}
      <section id="evento" className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 px-8 py-10 items-center">
            <div className="space-y-6">
              {/* <Image
                src="/turismo-talks-logo.png"
                alt="Turismo Talks Logo"
                width={600}
                height={120}
                className="object-contain"
                priority
              /> */}
              <div className="w-[300px] h-[60px] bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 font-bold">TURISMO TALKS</div>
              <h3 className="text-3xl md:text-4xl font-bold text-black">
                Participe do Turismo Talks: o evento que marca o início dessa
                jornada.
              </h3>
              <p className="text-lg md:text-xl text-gray-700">
                Com a participação de diversos atores do trade turístico,
                representantes dos governos, academia e parceiros estratégicos
                será realizado o Lançamento Oficial da LinkMe Tur, e você é
                nosso convidado!
              </p>
              <Button
                href="#evento"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: CTA_BG,
                  color: "black",
                  "&:hover": { backgroundColor: CTA_HOVER },
                  px: 6,
                  py: 1.5,
                  borderRadius: "9999px",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Quero participar do evento
              </Button>
              <ul className="mt-6 text-gray-700 space-y-2 text-base">
                <li>
                  <span className="mr-2">📍</span>
                  <strong>FASA</strong> – Santo Ângelo
                </li>
                <li>
                  <span className="mr-2">📅</span>
                  <strong>19 de Julho</strong>
                </li>
                <li>
                  <span className="mr-2">⏰</span>
                  <strong>08:00 às 18:00</strong>
                </li>
              </ul>
            </div>
            <div className="relative w-full h-60 md:h-80 lg:h-[28rem] bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 text-xl">
              {/* <Image
                src="/evento-foto.jpg"
                alt="Foto do evento"
                fill
                className="object-cover rounded-xl"
                priority
              /> */}
              Foto do Evento
            </div>
          </div>
        </div>
      </section>

      {/* PERGUNTAS FREQUENTES */}
      <section
        id="perguntas-frequentes"
        className="py-16 bg-gray-800 text-white px-8"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          Perguntas Frequentes
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold mb-4">A Plataforma</h4>
            <details className="mb-2">
              <summary>O que é a LinkMe Tur?</summary>
              <p className="mt-2">É um ecossistema que conecta...</p>
            </details>
            <details className="mb-2">
              <summary>Como a LinkMe Tur funciona?</summary>
              <p className="mt-2">Você se cadastra, escolhe...</p>
            </details>
            <details>
              <summary>A LinkMe Tur é gratuita?</summary>
              <p className="mt-2">Sim, para usuários iniciais...</p>
            </details>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Empresas de Turismo</h4>
            <details className="mb-2">
              <summary>Como minha empresa pode se cadastrar?</summary>
              <p className="mt-2">Basta clicar em "Fazer parte"...</p>
            </details>
            <details className="mb-2">
              <summary>Que tipo de prestadores encontro?</summary>
              <p className="mt-2">Marketing, tecnologia, jurídico...</p>
            </details>
            <details>
              <summary>Como a LinkMe Tur reduz custos?</summary>
              <p className="mt-2">Comparando avaliações e...</p>
            </details>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Prestadores de Serviços</h4>
            <details className="mb-2">
              <summary>Como me cadastrar como prestador?</summary>
              <p className="mt-2">Preencha o formulário de perfil...</p>
            </details>
            <details className="mb-2">
              <summary>Como recebo propostas?</summary>
              <p className="mt-2">As empresas enviam solicitações...</p>
            </details>
            <details>
              <summary>Quais benefícios há?</summary>
              <p className="mt-2">Maior visibilidade, novos clientes...</p>
            </details>
          </div>
        </div>
      </section>

      {/* CONTATO / FOOTER */}
      <footer id="contato" className="py-8 bg-gray-900 px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-white font-bold text-xl">
            LinkMe<span className="text-[#2BE58F]">Tur</span>
          </div>
          <div className="flex space-x-4">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              aria-label="Instagram"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.2a.8.8 0 1 1-.8.8.8.8 0 0 1 .8-.8z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              aria-label="Facebook"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M13 22v-8h3l1-4h-4V7.5A1.5 1.5 0 0 1 14.5 6H17V2h-3.5A4.5 4.5 0 0 0 9 6.5V10H6v4h3v8z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM14.5 9c-2.04 0-3.5 1.21-3.5 3.4V21h-4V9h4v1.7C11.6 9.64 12.86 9 14.5 9c2.6 0 4.5 1.73 4.5 5.2V21h-4v-6.2c0-1.55-.6-2.3-1.9-2.3z" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              aria-label="WhatsApp"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.5 3.5A11 11 0 0 0 2.7 18.7L2 22l3.4-.7A11 11 0 1 0 20.5 3.5zM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-2.4.5.5-2.3-.2-.3A8 8 0 1 1 12 20zm4.4-5.7c-.2-.1-1.3-.7-1.5-.8s-.4-.1-.6.1-.7.8-.9 1c-.2.2-.3.2-.6.1s-1.1-.4-2.1-1.3c-.8-.7-1.3-1.6-1.5-1.8-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5a2 2 0 0 0 .3-.5.6.6 0 0 0 0-.6c0-.1-.6-1.5-.8-2s-.4-.4-.6-.4h-.5c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 3 1.2 3.4 1.3 3.6s2.4 3.7 5.8 5 3.5 1 4.1 1 .9-.2 1.1-.6a4.6 4.6 0 0 0 .3-1.3c0-.6 0-1.1-.1-1.2s-.2-.2-.4-.3z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

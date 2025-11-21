"use client";

import {
	AnimatedSection,
	AudienceCard,
	BenefitCard,
	CTABanner,
	Container,
	FadeIn,
	FeatureCard,
	SectionHeader,
	SlideInLeft,
	SlideInRight,
	StaggerContainer,
	StaggerItem,
	WhatsAppCTA,
} from "@/components/shared";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
	Calendar,
	Clock,
	Eye,
	Instagram,
	Lightbulb,
	Linkedin,
	Lock,
	MapPin,
	MessageCircle,
	Network,
	Star,
} from "lucide-react";
import Image from "next/image";

export default function Landing() {
	return (
		<main className="font-sans overflow-x-hidden">
			{/* NAVBAR */}
			<motion.header
				className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm"
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				<Container className="flex items-center justify-between py-3">
					<div className="text-xl font-bold">
						LinkMe<span className="text-linkme-primary">Tur</span>
					</div>
					<nav className="hidden md:flex space-x-8 text-gray-800 text-sm">
						{[
							"O que é",
							"Para quem",
							"Vantagens",
							"Perguntas Frequentes",
							"Turismo Talks",
							"Contato",
						].map((item) => (
							<a
								key={item}
								href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
								className="hover:text-linkme-primary transition-colors duration-300"
							>
								{item}
							</a>
						))}
					</nav>
					<WhatsAppCTA size="default">Fazer parte</WhatsAppCTA>
				</Container>
			</motion.header>

			{/* HERO */}
			<section
				id="hero"
				className="relative h-screen w-full pt-24 bg-gradient-to-r from-blue-600 to-green-600"
			>
				<Image
					src="/hero.jpg"
					alt="Banner Hero"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black/40" />
				<div className="absolute inset-0 flex items-center px-8 lg:px-16">
					<div className="max-w-2xl">
						<motion.h1
							className="text-xl md:text-2xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							Transformamos a forma como as empresas fazem negócios com o
							turismo
						</motion.h1>
						<motion.p
							className="text-lg md:text-xl text-white mb-8"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
							Conectamos quem precisa com quem resolve
						</motion.p>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
						>
							<WhatsAppCTA size="lg">Quero fazer parte</WhatsAppCTA>
						</motion.div>
					</div>
				</div>
			</section>

			{/* O QUE É */}
			<section
				id="o-que-é"
				className="min-h-[50vh] flex flex-col justify-center py-16 bg-gray-50 text-center px-8"
			>
				<AnimatedSection>
					<SectionHeader title="Conecte-se com quem realmente importa" />
				</AnimatedSection>

				<AnimatedSection delay={0.2}>
					<div className="max-w-3xl mx-auto space-y-4 text-gray-700 mb-8">
						<p className="mb-8">
							Não somos apenas uma plataforma, somos um ecossistema, que conecta
							empresas de turismo a prestadores de serviços especializados e
							qualificados.
						</p>
						<p>
							Unimos quem vive o turismo na prática com quem tem as soluções
							certas para impulsionar esse setor:
						</p>
						<div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
							<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all duration-300">
								<p className="text-gray-800 font-medium">
									Profissionais de marketing
								</p>
							</div>
							<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all duration-300">
								<p className="text-gray-800 font-medium">Tecnologia</p>
							</div>
							<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all duration-300">
								<p className="text-gray-800 font-medium">Jurídico</p>
							</div>
							<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all duration-300">
								<p className="text-gray-800 font-medium">Contabilidade</p>
							</div>
							<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all duration-300">
								<p className="text-gray-800 font-medium">Sustentabilidade</p>
							</div>
							<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all duration-300">
								<p className="text-gray-800 font-medium">Inovação</p>
							</div>
							<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all duration-300">
								<p className="text-gray-800 font-medium">E muito mais</p>
							</div>
						</div>
						<p className="mt-8">
							Valorizamos os prestadores de serviço como peças-chave da
							engrenagem do turismo. Eles não são apenas fornecedores, são
							parceiros estratégicos para o desenvolvimento dos destinos. E nós
							acreditamos que fortalecer os bastidores do turismo é essencial
							para que os destinos brilhem.
						</p>
					</div>
				</AnimatedSection>
			</section>

			{/* NA LINKME TUR VOCÊ ENCONTRA... */}
			<section
				id="na-linkme-tur-você-encontra"
				className="min-h-[50vh] flex flex-col justify-center py-16 px-8 bg-white text-center"
			>
				<AnimatedSection delay={0.3}>
					<h3 className="text-2xl font-bold mb-8 text-black">
						Na LinkMe Tur você encontra os parceiros certos, de forma rápida,
						simples e eficiente
					</h3>
				</AnimatedSection>

				<StaggerContainer
					className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 "
					staggerDelay={0.15}
				>
					<StaggerItem>
						<FeatureCard
							title="Empresas do Trade Turístico"
							description="Encontre prestadores de serviços confiáveis com agilidade, reduza custos e modernize seu negócio com soluções sob medida."
							icon="/141.svg"
							iconAlt="Ícone Empresas do Trade Turístico"
						/>
					</StaggerItem>
					<StaggerItem>
						<FeatureCard
							title="Prestadores de Serviços"
							description="Ganhe visibilidade, acesse clientes qualificados do turismo e aumente suas oportunidades de negócio com menos esforço."
							icon="/142.svg"
							iconAlt="Ícone Prestadores de Serviços"
						/>
					</StaggerItem>
					<StaggerItem>
						<FeatureCard
							title="Para o Mercado e os Turistas"
							description="Fortalecemos os bastidores do turismo para que os destinos ofereçam experiências mais autênticas, sustentáveis e encantadoras."
							icon="/143.svg"
							iconAlt="Ícone Para o Mercado e os Turistas"
						/>
					</StaggerItem>
				</StaggerContainer>
			</section>

			{/* PARA QUEM */}
			<section
				id="para-quem"
				className="min-h-[80vh] flex flex-col justify-center py-16 px-8 bg-gray-50 text-center"
			>
				<AnimatedSection>
					<SectionHeader title="Para quem é a LinkMe Tur?" />
				</AnimatedSection>

				<div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
					<SlideInLeft>
						<AudienceCard
							title="Para empresas do turismo"
							icon="/141.svg"
							iconAlt="Ícone Empresas do Turismo"
							subtitle="(Meios de hospedagem, agências, atrativos, guias, restaurantes, eventos, transporte e produtores locais)"
							items={[
								"Encontre prestadores de serviços qualificados em minutos",
								"Reduza custos e tempo na contratação",
								"Compare avaliações de prestadores e reduza riscos",
								"Acesse soluções sob medida para crescer com eficiência",
							]}
							className="text-left"
						/>
					</SlideInLeft>
					<SlideInRight>
						<AudienceCard
							title="Para prestadores de serviço"
							icon="/144.svg"
							iconAlt="Ícone Prestadores de Serviço"
							subtitle="(Marketing, tecnologia, jurídico, contabilidade, ESG, inovação e mais)"
							items={[
								"Ganhe visibilidade e conecte-se com empresas do setor turístico",
								"Reduza o tempo e os custos na captação de clientes",
								"Conecte-se a oportunidades reais e que precisam dos seus serviços",
								"Destaque-se em uma plataforma que valoriza a qualidade e a inovação",
							]}
							className="text-left"
						/>
					</SlideInRight>
				</div>
			</section>

			{/* VANTAGENS */}
			<section
				id="vantagens"
				className="min-h-[80vh] flex flex-col justify-center py-16 bg-white text-center px-8"
			>
				<Container className="flex flex-col items-center">
					<AnimatedSection>
						<h2 className="mt-12 text-3xl md:text-4xl font-bold text-black">
							Quer fazer parte da transformação do turismo gaúcho?
							<br />
							Então essa oportunidade é pra você!
						</h2>
						<div className="mt-4 h-1 w-24 bg-linkme-primary rounded mx-auto" />
					</AnimatedSection>

					<AnimatedSection delay={0.2}>
						<p className="mt-6 max-w-3xl text-gray-700">
							Estamos construindo a LinkMe Tur ouvindo quem realmente faz
							acontecer todos os dias, VOCÊ! Ajude-nos a moldar uma plataforma
							feita sob medida para as necessidades reais do mercado e do seu
							negócio, veja como você ganha ao fazer parte da LinkMe Tur:
						</p>
					</AnimatedSection>

					{/* Cards de Benefícios */}
					<StaggerContainer
						className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto"
						staggerDelay={0.1}
					>
						<StaggerItem>
							<BenefitCard
								title="Prioridade para acessar e testar o MVP gratuitamente antes do lançamento"
								icon={<Lock className="w-6 h-6 text-linkme-primary" />}
							/>
						</StaggerItem>
						<StaggerItem>
							<BenefitCard
								title="Visibilidade como apoiador de um projeto inovador e de impacto regional"
								icon={<Star className="w-6 h-6 text-linkme-primary" />}
							/>
						</StaggerItem>
						<StaggerItem>
							<BenefitCard
								title="Se posiciona à frente em um mercado que valoriza inovação, eficiência e parcerias confiáveis"
								icon={<Eye className="w-6 h-6 text-linkme-primary" />}
							/>
						</StaggerItem>
						<StaggerItem>
							<BenefitCard
								title="Tem a chance de gerar novos negócios e fortalecer sua marca e crescer junto com um setor em plena expansão"
								icon={<Lightbulb className="w-6 h-6 text-linkme-primary" />}
							/>
						</StaggerItem>
						<StaggerItem>
							<BenefitCard
								title="Amplia suas conexões com empresas e profissionais do ecossistema turístico"
								icon={<Network className="w-6 h-6 text-linkme-primary" />}
							/>
						</StaggerItem>
					</StaggerContainer>

					{/* Texto de Call to Action */}
					<AnimatedSection delay={0.4} className="mt-12">
						<h3 className="text-2xl md:text-3xl font-bold text-black mb-8">
							Participar é rápido, gratuito e pode abrir portas valiosas para o
							futuro do seu negócio!
						</h3>
					</AnimatedSection>
				</Container>
			</section>

			{/* TURISMO MAIS FORTE */}
			<section
				id="forte"
				className="min-h-[50vh] flex flex-col justify-center py-16 bg-gray-50 text-center px-8"
			>
				<AnimatedSection>
					<h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
						Vamos juntos construir um turismo mais forte,
						<br />
						conectado, moderno e cheio de novas oportunidades para todos!
					</h2>
					<div className="mt-4 h-1 w-24 bg-linkme-primary mx-auto rounded" />
				</AnimatedSection>
				<AnimatedSection
					delay={0.2}
					className="mt-12 max-w-4xl mx-auto text-center"
				>
					<p className="text-3xl md:text-4xl font-bold text-black mb-6 leading-snug">
						O turismo gaúcho precisa de quem acredita no seu futuro, e esse
						futuro <span className="text-linkme-primary">começa agora!</span>
					</p>
				</AnimatedSection>
			</section>

			{/* EVENTO */}
			<section
				id="turismo-talks"
				className="min-h-[80vh] flex flex-col justify-center py-16 bg-white"
			>
				<Container className="bg-white rounded-2xl shadow-lg overflow-hidden">
					<div className="grid md:grid-cols-2 gap-8 px-8 py-10 items-center">
						<SlideInLeft>
							<div className="space-y-6">
								<h2 className="text-4xl md:text-5xl font-extrabold text-linkme-primary">
									Turismo Talks
								</h2>
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
									asChild
									size="lg"
									className="bg-linkme-primary hover:bg-linkme-primary-hover text-black rounded-full px-6 transition-all duration-300 hover:scale-105"
								>
									<a
										href="https://instagram.com/reel/DMffP1ox9JP/?igsh=MXU0amN1cDNpOGloeA=="
										target="_blank"
										rel="noopener noreferrer"
									>
										Veja como foi o evento
									</a>
								</Button>
								<ul className="mt-6 text-gray-700 space-y-2 text-base">
									<li className="flex items-center gap-2">
										<MapPin className="w-5 h-5 text-linkme-primary" />
										<strong>FASA</strong> – Santo Ângelo
									</li>
									<li className="flex items-center gap-2">
										<Calendar className="w-5 h-5 text-linkme-primary" />
										<strong>19 de Julho</strong>
									</li>
									<li className="flex items-center gap-2">
										<Clock className="w-5 h-5 text-linkme-primary" />
										<strong>08:00 às 18:00</strong>
									</li>
								</ul>
							</div>
						</SlideInLeft>
						<SlideInRight>
							<div className="relative w-full h-60 md:h-80 lg:h-[28rem] rounded-xl overflow-hidden">
								<Image
									src="/evento-foto.jpg"
									alt="Foto do evento Turismo Talks - Lançamento LinkMe Tur"
									fill
									className="object-cover rounded-xl transition-transform duration-500 hover:scale-105"
									priority
								/>
							</div>
						</SlideInRight>
					</div>
				</Container>
			</section>

			{/* PERGUNTAS FREQUENTES */}
			<section
				id="perguntas-frequentes"
				className="py-16 bg-gray-800 text-white px-8"
			>
				<AnimatedSection>
					<h2 className="text-3xl font-bold text-center mb-8">
						Perguntas Frequentes
					</h2>
				</AnimatedSection>
				<Container>
					<StaggerContainer
						className="grid md:grid-cols-3 gap-8"
						staggerDelay={0.1}
					>
						<StaggerItem>
							<div>
								<h4 className="font-semibold mb-4">A Plataforma</h4>
								<Accordion type="single" collapsible className="space-y-2">
									<AccordionItem
										value="item-1"
										className="border-b border-gray-600"
									>
										<AccordionTrigger className="text-left hover:no-underline">
											O que é a LinkMe Tur?
										</AccordionTrigger>
										<AccordionContent>
											Somos uma plataforma digital inteligente que conecta
											empresas de turismo a prestadores de serviços
											qualificados, promovendo eficiência, agilidade e segurança
											na contratação. Nosso objetivo é impulsionar o crescimento
											colaborativo e transformar o turismo em uma rede de
											oportunidades sustentáveis e inovadoras, onde todos
											prosperam juntos.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem
										value="item-2"
										className="border-b border-gray-600"
									>
										<AccordionTrigger className="text-left hover:no-underline">
											Como a LinkMe Tur conecta empresas de turismo a
											prestadores?
										</AccordionTrigger>
										<AccordionContent>
											Por meio de uma plataforma com filtros inteligentes,
											perfis detalhados e curadoria de serviços, facilitamos o
											encontro entre quem precisa de soluções e quem tem a
											expertise para entregar. Tudo de forma rápida, segura e
											personalizada para o setor de turismo.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem
										value="item-3"
										className="border-b border-gray-600"
									>
										<AccordionTrigger className="text-left hover:no-underline">
											A LinkMe Tur é gratuita?
										</AccordionTrigger>
										<AccordionContent>
											Sim. Durante o período de testes (MVP), a plataforma será
											disponibilizada gratuitamente para empresas de turismo e
											prestadores de serviços. Após essa fase, os planos serão
											acessíveis e proporcionais ao porte e às necessidades de
											cada negócio.
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>
						</StaggerItem>
						<StaggerItem>
							<div>
								<h4 className="font-semibold mb-4">Para Você</h4>
								<Accordion type="single" collapsible className="space-y-2">
									<AccordionItem
										value="item-4"
										className="border-b border-gray-600"
									>
										<AccordionTrigger className="text-left hover:no-underline">
											A LinkMe Tur é pra mim?
										</AccordionTrigger>
										<AccordionContent>
											Se você possui uma agência de viagens, hotel, pousada,
											atrativo turístico, restaurante, empresa de transporte,
											organiza experiências ou atua com guiamento e receptivo, a
											LinkMe Tur é pra você! Nossa plataforma é inclusiva e
											acessível, pensada tanto para profissionais autônomos,
											como guias de turismo e motoristas particulares, quanto
											para médias e grandes redes do setor. Se você vive o
											turismo na prática e quer crescer com mais eficiência,
											visibilidade e conexões estratégicas esse é o seu lugar.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem
										value="item-5"
										className="border-b border-gray-600"
									>
										<AccordionTrigger className="text-left hover:no-underline">
											Quais tipos de prestadores de serviços posso encontrar na
											plataforma?
										</AccordionTrigger>
										<AccordionContent>
											Você encontrará empresas e profissionais nas áreas de
											marketing, tecnologia, sustentabilidade, jurídico,
											contabilidade, design, consultorias, treinamentos,
											inovação e muito mais. Todas as empresas que agregam valor
											ao turismo são bem-vindas, independente do tamanho ou
											número de colaboradores.
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>
						</StaggerItem>
						<StaggerItem>
							<div>
								<h4 className="font-semibold mb-4">Benefícios</h4>
								<Accordion type="single" collapsible className="space-y-2">
									<AccordionItem
										value="item-6"
										className="border-b border-gray-600"
									>
										<AccordionTrigger className="text-left hover:no-underline">
											Como a LinkMe Tur ajuda a reduzir custos e tempo na
											contratação?
										</AccordionTrigger>
										<AccordionContent>
											Oferecemos uma experiência simples e eficiente, com
											curadoria de profissionais e ferramentas de busca
											avançada. Isso reduz o tempo gasto na procura por
											fornecedores confiáveis e evita custos com contratações
											mal direcionadas.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem
										value="item-7"
										className="border-b border-gray-600"
									>
										<AccordionTrigger className="text-left hover:no-underline">
											Como a LinkMe Tur me ajuda a receber propostas relevantes?
										</AccordionTrigger>
										<AccordionContent>
											Com filtros inteligentes, perfis estratégicos e
											segmentação por interesse, a LinkMe Tur aproxima as
											demandas reais do turismo das soluções que você oferece.
											Quanto mais claro, atrativo e bem construído for o seu
											perfil, maiores serão suas chances de visibilidade e
											conexão com clientes qualificados.
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>
						</StaggerItem>
					</StaggerContainer>
				</Container>
			</section>

			{/* CTA BANNER */}
			<FadeIn>
				<CTABanner
					title="Aumente a eficiência, reduza custos e fortaleça o turismo gaúcho com a LinkMe Tur"
					primaryAction={{
						label: "Quero fazer parte",
						href: "https://wa.me/555599623685?text=Quero%20fazer%20parte%20da%20LinkMe%20Tur",
					}}
				/>
			</FadeIn>

			{/* CONTATO / FOOTER */}
			<footer id="contato" className="py-8 bg-gray-900 px-8">
				<Container className="flex items-center justify-between">
					<div className="text-white font-bold text-xl">
						LinkMe<span className="text-linkme-primary">Tur</span>
					</div>
					<div className="flex space-x-4">
						<a
							href="https://www.instagram.com/linkmetur/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-linkme-primary transition-colors duration-300"
							aria-label="Instagram"
						>
							<Instagram className="w-6 h-6" />
						</a>
						<a
							href="https://www.linkedin.com/company/linkmetur/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-linkme-primary transition-colors duration-300"
							aria-label="LinkedIn"
						>
							<Linkedin className="w-6 h-6" />
						</a>
						<a
							href="https://wa.me/555599623685"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-linkme-primary transition-colors duration-300"
							aria-label="WhatsApp"
						>
							<MessageCircle className="w-6 h-6" />
						</a>
					</div>
				</Container>
			</footer>
		</main>
	);
}

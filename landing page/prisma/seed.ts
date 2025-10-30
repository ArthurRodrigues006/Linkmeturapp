import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar categorias
  const categories = [
    { name: 'Marketing Digital', icon: '📱', color: '#3B82F6' },
    { name: 'Tecnologia', icon: '💻', color: '#10B981' },
    { name: 'Hospedagem', icon: '🏨', color: '#F59E0B' },
    { name: 'Turismo Rural', icon: '🌾', color: '#84CC16' },
    { name: 'Gastronomia', icon: '🍽️', color: '#EF4444' },
    { name: 'Transporte', icon: '🚌', color: '#8B5CF6' },
    { name: 'Aventura', icon: '🏔️', color: '#06B6D4' },
    { name: 'Jurídico', icon: '⚖️', color: '#6B7280' },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    })
  }

  // Criar corporação exemplo
  const corporation = await prisma.corporation.upsert({
    where: { email: 'contato@linkmetur.com.br' },
    update: {},
    create: {
      name: 'LinkMe Tur',
      email: 'contato@linkmetur.com.br',
      phone: '(51) 99999-9999',
      cnpj: '12.345.678/0001-90',
      address: 'Porto Alegre, RS',
      website: 'https://linkmetur.com.br',
      description: 'Plataforma que conecta empresas do turismo com prestadores de serviços especializados.',
    },
  })

  // Criar usuário administrador
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@linkmetur.com.br' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@linkmetur.com.br',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      phone: '(51) 99999-9999',
      level: 3, // super_admin
      corporationId: corporation.id,
      emailVerified: new Date(),
    },
  })

  // Criar algumas corporações de exemplo
  const corporations = [
    {
      name: 'Hotel Fazenda Recanto',
      email: 'contato@fazendarecanto.com.br',
      phone: '(54) 3282-1234',
      cnpj: '98.765.432/0001-10',
      address: 'Canela, RS',
      description: 'Hotel fazenda familiar na Serra Gaúcha oferecendo experiências rurais autênticas.',
    },
    {
      name: 'Eco Aventuras RS',
      email: 'info@ecoaventuras.com.br',
      phone: '(51) 3456-7890',
      cnpj: '11.222.333/0001-44',
      address: 'Gramado, RS',
      description: 'Empresa especializada em turismo de aventura e ecoturismo na região da Serra.',
    },
    {
      name: 'Pousada Vista Alegre',
      email: 'reservas@vistaalegre.com.br',
      phone: '(53) 3264-5678',
      cnpj: '55.666.777/0001-88',
      address: 'Pelotas, RS',
      description: 'Pousada aconchegante com vista para a lagoa, ideal para relaxar e descansar.',
    },
  ]

  const createdCorporations = []
  for (const corp of corporations) {
    const created = await prisma.corporation.upsert({
      where: { email: corp.email },
      update: {},
      create: corp,
    })
    createdCorporations.push(created)
  }

  // Criar usuários para as corporações
  const users = [
    {
      name: 'Maria Santos',
      email: 'maria@fazendarecanto.com.br',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
      phone: '(54) 99888-7777',
      level: 2,
      corporationId: createdCorporations[0].id,
    },
    {
      name: 'João Silva',
      email: 'joao@ecoaventuras.com.br',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
      phone: '(51) 98765-4321',
      level: 2,
      corporationId: createdCorporations[1].id,
    },
    {
      name: 'Ana Costa',
      email: 'ana@vistaalegre.com.br',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
      phone: '(53) 97654-3210',
      level: 2,
      corporationId: createdCorporations[2].id,
    },
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    })
  }

  // Criar serviços/jobs de exemplo
  const jobs = [
    {
      title: 'Pacote Turismo Rural Completo',
      description: 'Experiência completa de turismo rural com hospedagem, alimentação e atividades na fazenda.',
      category: 'Turismo Rural',
      minValue: 200,
      maxValue: 350,
      duration: '2 dias',
      location: 'Canela, RS',
      requirements: 'Idade mínima 12 anos',
      benefits: 'Café da manhã, almoço, jantar, atividades guiadas',
      published: true,
      featured: true,
      corporationId: createdCorporations[0].id,
    },
    {
      title: 'Trilha Ecológica Guiada',
      description: 'Trilha pela mata nativa com guia especializado, observação da fauna e flora local.',
      category: 'Aventura',
      minValue: 80,
      maxValue: 120,
      duration: '4 horas',
      location: 'Gramado, RS',
      requirements: 'Bom condicionamento físico',
      benefits: 'Guia especializado, equipamentos de segurança, lanche',
      published: true,
      corporationId: createdCorporations[1].id,
    },
    {
      title: 'Hospedagem Romântica',
      description: 'Suíte romântica com vista para a lagoa, café da manhã especial e decoração temática.',
      category: 'Hospedagem',
      minValue: 180,
      maxValue: 280,
      duration: '1 diária',
      location: 'Pelotas, RS',
      requirements: 'Reserva com antecedência',
      benefits: 'Café da manhã, decoração especial, vista privilegiada',
      published: true,
      corporationId: createdCorporations[2].id,
    },
    {
      title: 'Consultoria em Marketing Digital',
      description: 'Consultoria especializada em marketing digital para empresas do setor turístico.',
      category: 'Marketing Digital',
      minValue: 150,
      maxValue: 300,
      duration: '2 horas',
      location: 'Online ou presencial',
      requirements: 'Material da empresa disponível',
      benefits: 'Relatório completo, estratégias personalizadas',
      published: true,
      corporationId: corporation.id,
    },
  ]

  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    })
  }

  // Criar alguns contatos de exemplo
  const contacts = [
    {
      name: 'Pedro Oliveira',
      email: 'pedro@email.com',
      phone: '(51) 98888-7777',
      company: 'Turismo Aventura Ltda',
      message: 'Gostaria de saber mais sobre parcerias para turismo de aventura.',
      corporationId: createdCorporations[1].id,
    },
    {
      name: 'Carla Mendes',
      email: 'carla@email.com',
      phone: '(54) 97777-6666',
      company: 'Agência Viagem Fácil',
      message: 'Interesse em incluir o hotel fazenda em nossos roteiros.',
      corporationId: createdCorporations[0].id,
    },
    {
      name: 'Roberto Santos',
      email: 'roberto@email.com',
      phone: '(53) 96666-5555',
      message: 'Procuro hospedagem para lua de mel em dezembro.',
      corporationId: createdCorporations[2].id,
    },
  ]

  for (const contact of contacts) {
    await prisma.contact.create({
      data: contact,
    })
  }

  // Criar configurações do sistema
  const settings = [
    { key: 'site_name', value: 'LinkMe Tur', description: 'Nome do site' },
    { key: 'site_description', value: 'Conectando o turismo gaúcho', description: 'Descrição do site' },
    { key: 'contact_email', value: 'contato@linkmetur.com.br', description: 'Email de contato' },
    { key: 'contact_phone', value: '(51) 99999-9999', description: 'Telefone de contato' },
    { key: 'max_upload_size', value: '5242880', description: 'Tamanho máximo de upload (5MB)' },
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }

  console.log('✅ Seed concluído com sucesso!')
  console.log('📊 Dados criados:')
  console.log(`   - ${categories.length} categorias`)
  console.log(`   - ${corporations.length + 1} corporações`)
  console.log(`   - ${users.length + 1} usuários`)
  console.log(`   - ${jobs.length} serviços`)
  console.log(`   - ${contacts.length} contatos`)
  console.log(`   - ${settings.length} configurações`)
  console.log('')
  console.log('🔑 Usuário admin criado:')
  console.log('   Email: admin@linkmetur.com.br')
  console.log('   Senha: password')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


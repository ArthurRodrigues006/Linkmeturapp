import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar corporações
  const corporation1 = await prisma.corporation.upsert({
    where: { email: 'contato@turismobrasil.com' },
    update: {},
    create: {
      name: 'Turismo Brasil LTDA',
      email: 'contato@turismobrasil.com',
      phone: '(11) 99999-9999',
      cnpj: '12.345.678/0001-90',
      description: 'Agência de turismo especializada em destinos nacionais',
      website: 'https://turismobrasil.com',
      address: 'Rua das Flores, 123 - São Paulo, SP'
    }
  })

  const corporation2 = await prisma.corporation.upsert({
    where: { email: 'info@viagensaventuras.com' },
    update: {},
    create: {
      name: 'Viagens & Aventuras',
      email: 'info@viagensaventuras.com',
      phone: '(21) 88888-8888',
      cnpj: '98.765.432/0001-10',
      description: 'Operadora de turismo de aventura e ecoturismo',
      website: 'https://viagensaventuras.com',
      address: 'Av. da Aventura, 456 - Rio de Janeiro, RJ'
    }
  })

  // Criar usuários
  const hashedPassword = await bcrypt.hash('123456', 10)

  const user1 = await prisma.user.upsert({
    where: { email: 'joao@turismobrasil.com' },
    update: {},
    create: {
      name: 'João Silva',
      email: 'joao@turismobrasil.com',
      password: hashedPassword,
      phone: '(11) 99999-9999',
      level: 1,
      corpId: corporation1.id
    }
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'maria@viagensaventuras.com' },
    update: {},
    create: {
      name: 'Maria Santos',
      email: 'maria@viagensaventuras.com',
      password: hashedPassword,
      phone: '(21) 88888-8888',
      level: 1,
      corpId: corporation2.id
    }
  })

  // Criar jobs
  const job1 = await prisma.job.upsert({
    where: { id: 'job-1' },
    update: {},
    create: {
      id: 'job-1',
      corpId: corporation1.id,
      name: 'Pacote Rio de Janeiro',
      category: 'Hospedagem',
      subCategory: 'Pacotes Completos',
      description: 'Pacote completo para 3 dias no Rio de Janeiro incluindo hotel, passeios e traslados. Inclui visita ao Cristo Redentor, Pão de Açúcar e praias famosas.',
      minValue: 800.00,
      maxValue: 1200.00,
      published: true,
      certifications: ['Certificação de Qualidade', 'Seguro Viagem'],
      availability: ['Disponível', 'Sob Consulta']
    }
  })

  const job2 = await prisma.job.upsert({
    where: { id: 'job-2' },
    update: {},
    create: {
      id: 'job-2',
      corpId: corporation2.id,
      name: 'Trilha da Pedra Azul',
      category: 'Ecoturismo',
      subCategory: 'Trilhas',
      description: 'Trilha guiada na Pedra Azul com guia especializado e equipamentos inclusos. Duração de 4 horas com parada para almoço.',
      minValue: 150.00,
      maxValue: 200.00,
      published: true,
      certifications: ['Guia Credenciado', 'Equipamentos de Segurança'],
      availability: ['Disponível']
    }
  })

  const job3 = await prisma.job.upsert({
    where: { id: 'job-3' },
    update: {},
    create: {
      id: 'job-3',
      corpId: corporation1.id,
      name: 'Pacote Fernando de Noronha',
      category: 'Hospedagem',
      subCategory: 'Destinos Premium',
      description: 'Pacote de 5 dias em Fernando de Noronha com hospedagem em pousada, mergulho e passeios de barco.',
      minValue: 2500.00,
      maxValue: 3500.00,
      published: true,
      certifications: ['Certificação de Qualidade', 'Seguro Viagem', 'Mergulho Certificado'],
      availability: ['Disponível', 'Sob Consulta']
    }
  })

  // Criar fotos para os jobs
  await prisma.jobPhoto.createMany({
    data: [
      {
        jobId: job1.id,
        url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800',
        alt: 'Vista do Cristo Redentor'
      },
      {
        jobId: job1.id,
        url: 'https://images.unsplash.com/photo-1516307365421-335f2d7d6b71?w=800',
        alt: 'Pão de Açúcar'
      },
      {
        jobId: job2.id,
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        alt: 'Trilha da Pedra Azul'
      },
      {
        jobId: job3.id,
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        alt: 'Fernando de Noronha'
      }
    ]
  })

  // Criar contatos
  await prisma.contact.createMany({
    data: [
      {
        corpId: corporation1.id,
        name: 'Carlos Mendes',
        email: 'carlos@hotelrio.com',
        phone: '(21) 77777-7777',
        company: 'Hotel Rio Maravilha',
        position: 'Gerente de Vendas',
        notes: 'Contato preferencial para hospedagem no Rio'
      },
      {
        corpId: corporation1.id,
        name: 'Ana Costa',
        email: 'ana@transporte.com',
        phone: '(21) 66666-6666',
        company: 'Transporte Turístico RJ',
        position: 'Coordenadora',
        notes: 'Parceira para traslados e passeios'
      },
      {
        corpId: corporation2.id,
        name: 'Pedro Aventura',
        email: 'pedro@trilhas.com',
        phone: '(27) 55555-5555',
        company: 'Trilhas Capixabas',
        position: 'Guia Especializado',
        notes: 'Especialista em trilhas na região'
      }
    ]
  })

  // Criar notificações
  await prisma.notification.createMany({
    data: [
      {
        corpId: corporation1.id,
        message: 'Novo contato adicionado: Carlos Mendes',
        type: 'contato',
        read: false
      },
      {
        corpId: corporation1.id,
        message: 'Job "Pacote Rio de Janeiro" publicado com sucesso',
        type: 'job',
        read: false
      },
      {
        corpId: corporation2.id,
        message: 'Bem-vindo ao LinkMeTur! Configure seu perfil para começar.',
        type: 'sistema',
        read: false
      }
    ]
  })

  console.log('✅ Seed concluído com sucesso!')
  console.log(`📊 Criados:`)
  console.log(`   - 2 Corporações`)
  console.log(`   - 2 Usuários`)
  console.log(`   - 3 Jobs`)
  console.log(`   - 4 Fotos de Jobs`)
  console.log(`   - 3 Contatos`)
  console.log(`   - 3 Notificações`)
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

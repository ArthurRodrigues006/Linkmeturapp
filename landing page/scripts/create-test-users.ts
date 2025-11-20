import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createTestUsers() {
  try {
    console.log('👥 Criando usuários de teste...\n')

    const hashedPassword = await bcrypt.hash('password', 10)

    // Usuário prestador de serviço (sem corporação)
    const serviceProvider = await prisma.user.upsert({
      where: { email: 'prestador@test.com' },
      update: {
        password: hashedPassword,
        active: true,
      },
      create: {
        name: 'Prestador de Serviço',
        email: 'prestador@test.com',
        password: hashedPassword,
        phone: '(51) 98888-7777',
        level: 1, // usuário comum
        active: true,
        emailVerified: new Date(),
      },
    })

    console.log('✅ Usuários criados com sucesso!\n')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('👤 PRESTADOR DE SERVIÇO (Dashboard Prestador)')
    console.log('   Email: prestador@test.com')
    console.log('   Senha: password')
    console.log('   Acesso: /dashboard')
    console.log('')
    console.log('👔 EMPRESA DE TURISMO (Dashboard Empresa)')
    console.log('   Email: admin@linkmetur.com.br')
    console.log('   Senha: password')
    console.log('   Acesso: /dashboard-empresa')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUsers()

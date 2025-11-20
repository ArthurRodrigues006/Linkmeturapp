import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('🔍 Testando conexão com o banco de dados...\n')

    const userCount = await prisma.user.count()
    const corporationCount = await prisma.corporation.count()

    console.log('✅ Conexão bem-sucedida!')
    console.log(`📊 Total de usuários: ${userCount}`)
    console.log(`🏢 Total de corporações: ${corporationCount}`)

    // Buscar o usuário admin
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@linkmetur.com.br' },
      select: {
        name: true,
        email: true,
        level: true,
        active: true,
      }
    })

    if (admin) {
      console.log('\n👤 Usuário admin encontrado:')
      console.log(`   Nome: ${admin.name}`)
      console.log(`   Email: ${admin.email}`)
      console.log(`   Nível: ${admin.level}`)
      console.log(`   Ativo: ${admin.active}`)
    }

  } catch (error) {
    console.error('❌ Erro na conexão:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    console.log('🔧 Criando/atualizando usuário administrador...\n')

    // Hash da senha "password"
    const hashedPassword = await bcrypt.hash('password', 10)
    console.log('✓ Senha hasheada gerada')

    // Buscar ou criar corporação
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
    console.log('✓ Corporação verificada:', corporation.name)

    // Criar/atualizar usuário admin
    const admin = await prisma.user.upsert({
      where: { email: 'admin@linkmetur.com.br' },
      update: {
        password: hashedPassword,
        level: 3,
        active: true,
        emailVerified: new Date(),
      },
      create: {
        name: 'Administrador',
        email: 'admin@linkmetur.com.br',
        password: hashedPassword,
        phone: '(51) 99999-9999',
        level: 3,
        corporationId: corporation.id,
        emailVerified: new Date(),
        active: true,
      },
    })

    console.log('✓ Usuário admin criado/atualizado')
    console.log('\n✅ Sucesso! Use as seguintes credenciais:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📧 Email: admin@linkmetur.com.br')
    console.log('🔑 Senha: password')
    console.log('👤 Nível: Super Admin (3)')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    // Verificar a senha
    const testPassword = await bcrypt.compare('password', admin.password)
    console.log('🧪 Teste de senha:', testPassword ? '✓ OK' : '✗ FALHOU')

  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()

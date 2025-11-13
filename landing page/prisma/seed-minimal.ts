import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed mínimo do banco de dados...')

  // Criar apenas as categorias (dados essenciais do sistema)
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

  // Criar configurações essenciais do sistema
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

  console.log('✅ Seed mínimo concluído com sucesso!')
  console.log('📊 Dados criados:')
  console.log(`   - ${categories.length} categorias`)
  console.log(`   - ${settings.length} configurações`)
  console.log('')
  console.log('ℹ️  Nenhum usuário ou empresa de exemplo foi criado.')
  console.log('   Use o sistema normalmente para cadastrar seus dados.')
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


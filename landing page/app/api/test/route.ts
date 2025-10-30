import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

// GET /api/test - Testar conexão com banco
export async function GET() {
  try {
    // Testar conexão com o banco
    const userCount = await prisma.user.count()
    const corporationCount = await prisma.corporation.count()
    const jobCount = await prisma.job.count()
    const contactCount = await prisma.contact.count()

    return NextResponse.json({
      success: true,
      message: 'API funcionando corretamente!',
      data: {
        database: 'Conectado',
        counts: {
          users: userCount,
          corporations: corporationCount,
          jobs: jobCount,
          contacts: contactCount
        },
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Erro no teste da API:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro na conexão com o banco de dados',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}

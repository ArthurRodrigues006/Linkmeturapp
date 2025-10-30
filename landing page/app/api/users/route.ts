import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

// GET /api/users - Listar todos os usuários
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        level: true,
        active: true,
        createdAt: true,
        corporation: {
          select: {
            id: true,
            name: true,
            cnpj: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const corporations = await prisma.corporation.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cnpj: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        users,
        corporations,
        totalUsers: users.length,
        totalCorporations: corporations.length
      },
      message: 'Dados do banco carregados com sucesso'
    })

  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao conectar com o banco de dados',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}

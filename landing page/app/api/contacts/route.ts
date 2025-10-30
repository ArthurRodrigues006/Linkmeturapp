import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

// GET /api/contacts - Listar contatos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const corporationId = searchParams.get('corporationId')
    const status = searchParams.get('status')
    const favorited = searchParams.get('favorited')

    const skip = (page - 1) * limit

    // Construir filtros
    const where: any = {}
    
    if (corporationId) {
      where.corporationId = corporationId
    }
    
    if (status) {
      where.status = status
    }
    
    if (favorited !== null) {
      where.favorited = favorited === 'true'
    }

    // Buscar contatos
    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        include: {
          corporation: {
            select: {
              id: true,
              name: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.contact.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })

  } catch (error) {
    console.error('Erro ao buscar contatos:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/contacts - Criar novo contato
export async function POST(request: NextRequest) {
  try {
    const {
      nome,
      email,
      telefone,
      empresa,
      mensagem,
      corporationId,
      userId
    } = await request.json()

    // Validar dados obrigatórios
    if (!nome || !email) {
      return NextResponse.json(
        { success: false, error: 'Nome e email são obrigatórios' },
        { status: 400 }
      )
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Criar contato
    const contact = await prisma.contact.create({
      data: {
        name: nome,
        email: email,
        phone: telefone,
        company: empresa,
        message: mensagem,
        corporationId: corporationId,
        userId: userId,
        status: 'new'
      },
      include: {
        corporation: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: contact,
      message: 'Contato criado com sucesso'
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar contato:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

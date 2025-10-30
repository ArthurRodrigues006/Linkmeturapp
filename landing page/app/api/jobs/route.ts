import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

// GET /api/jobs - Listar serviços
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const published = searchParams.get('published')
    const corporationId = searchParams.get('corporationId')

    const skip = (page - 1) * limit

    // Construir filtros
    const where: any = {}
    
    if (category) {
      where.category = category
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    if (published !== null) {
      where.published = published === 'true'
    }
    
    if (corporationId) {
      where.corporationId = corporationId
    }

    // Buscar serviços
    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: {
          corporation: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true
            }
          },
          photos: true,
          _count: {
            select: {
              applications: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.job.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: {
        jobs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })

  } catch (error) {
    console.error('Erro ao buscar serviços:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/jobs - Criar novo serviço
export async function POST(request: NextRequest) {
  try {
    const {
      titulo,
      descricao,
      categoria,
      precoMin,
      precoMax,
      prazo,
      localizacao,
      requisitos,
      beneficios,
      corporationId
    } = await request.json()

    // Validar dados obrigatórios
    if (!titulo || !descricao || !categoria || !corporationId) {
      return NextResponse.json(
        { success: false, error: 'Título, descrição, categoria e corporação são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se a corporação existe
    const corporation = await prisma.corporation.findUnique({
      where: { id: corporationId }
    })

    if (!corporation) {
      return NextResponse.json(
        { success: false, error: 'Corporação não encontrada' },
        { status: 404 }
      )
    }

    // Criar serviço
    const job = await prisma.job.create({
      data: {
        title: titulo,
        description: descricao,
        category: categoria,
        minValue: precoMin ? parseFloat(precoMin) : null,
        maxValue: precoMax ? parseFloat(precoMax) : null,
        duration: prazo,
        location: localizacao,
        requirements: requisitos,
        benefits: beneficios,
        corporationId: corporationId,
        published: false // Por padrão não publicado
      },
      include: {
        corporation: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: job,
      message: 'Serviço criado com sucesso'
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar serviço:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

// GET /api/corporations - Listar corporações
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')
    const active = searchParams.get('active')

    const skip = (page - 1) * limit

    // Construir filtros
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { cnpj: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    if (active !== null) {
      where.active = active === 'true'
    }

    // Buscar corporações
    const [corporations, total] = await Promise.all([
      prisma.corporation.findMany({
        where,
        include: {
          _count: {
            select: {
              users: true,
              jobs: true,
              contacts: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.corporation.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: {
        corporations,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })

  } catch (error) {
    console.error('Erro ao buscar corporações:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/corporations - Criar nova corporação
export async function POST(request: NextRequest) {
  try {
    const {
      nome,
      email,
      telefone,
      cnpj,
      endereco,
      website,
      descricao,
      logo
    } = await request.json()

    // Validar dados obrigatórios
    if (!nome || !email || !cnpj) {
      return NextResponse.json(
        { success: false, error: 'Nome, email e CNPJ são obrigatórios' },
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

    // Verificar se email já existe
    const existingEmailCorp = await prisma.corporation.findUnique({
      where: { email }
    })

    if (existingEmailCorp) {
      return NextResponse.json(
        { success: false, error: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    // Verificar se CNPJ já existe
    const existingCnpjCorp = await prisma.corporation.findUnique({
      where: { cnpj }
    })

    if (existingCnpjCorp) {
      return NextResponse.json(
        { success: false, error: 'CNPJ já cadastrado' },
        { status: 400 }
      )
    }

    // Criar corporação
    const corporation = await prisma.corporation.create({
      data: {
        name: nome,
        email: email,
        phone: telefone,
        cnpj: cnpj,
        address: endereco,
        website: website,
        description: descricao,
        logo: logo
      }
    })

    return NextResponse.json({
      success: true,
      data: corporation,
      message: 'Corporação criada com sucesso'
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar corporação:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

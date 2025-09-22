import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  try {
    const corporations = await prisma.corporation.findMany({
      include: {
        users: true,
        jobs: true,
        _count: {
          select: {
            users: true,
            jobs: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(corporations)
  } catch (error) {
    console.error('Erro ao buscar corporações:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const corporation = await prisma.corporation.create({
      data,
      include: {
        users: true,
        jobs: true
      }
    })

    return NextResponse.json(corporation, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar corporação:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

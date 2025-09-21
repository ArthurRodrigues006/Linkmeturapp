import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const corpId = searchParams.get('corpId')

    const where: any = {}
    if (corpId) {
      where.corpId = corpId
    }

    const contacts = await prisma.contact.findMany({
      where,
      include: {
        corporation: true,
        user: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Erro ao buscar contatos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const contact = await prisma.contact.create({
      data,
      include: {
        corporation: true,
        user: true
      }
    })

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar contato:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

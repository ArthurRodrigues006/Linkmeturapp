import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const corpId = searchParams.get('corpId')
    const published = searchParams.get('published')

    const where: any = {}
    
    if (corpId) {
      where.corpId = corpId
    }
    
    if (published === 'true') {
      where.published = true
    }

    const jobs = await prisma.job.findMany({
      where,
      include: {
        corporation: true,
        photos: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Erro ao buscar jobs:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const job = await prisma.job.create({
      data: {
        ...data,
        certifications: data.certifications || [],
        availability: data.availability || []
      },
      include: {
        corporation: true,
        photos: true
      }
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar job:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

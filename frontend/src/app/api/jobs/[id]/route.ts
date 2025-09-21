import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: {
        corporation: true,
        photos: true
      }
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error('Erro ao buscar job:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    
    const job = await prisma.job.update({
      where: { id: params.id },
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

    return NextResponse.json(job)
  } catch (error) {
    console.error('Erro ao atualizar job:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.job.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Job deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar job:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

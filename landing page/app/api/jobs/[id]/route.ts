import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

// GET /api/jobs/[id] - Buscar serviço por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: {
        corporation: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            website: true,
            description: true
          }
        },
        photos: true,
        applications: {
          select: {
            id: true,
            applicantName: true,
            applicantEmail: true,
            status: true,
            createdAt: true
          }
        }
      }
    })

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Serviço não encontrado' },
        { status: 404 }
      )
    }

    // Incrementar visualizações
    await prisma.job.update({
      where: { id: params.id },
      data: { views: { increment: 1 } }
    })

    return NextResponse.json({
      success: true,
      data: job
    })

  } catch (error) {
    console.error('Erro ao buscar serviço:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT /api/jobs/[id] - Atualizar serviço
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      published
    } = await request.json()

    // Verificar se o serviço existe
    const existingJob = await prisma.job.findUnique({
      where: { id: params.id }
    })

    if (!existingJob) {
      return NextResponse.json(
        { success: false, error: 'Serviço não encontrado' },
        { status: 404 }
      )
    }

    // Atualizar serviço
    const job = await prisma.job.update({
      where: { id: params.id },
      data: {
        title: titulo || existingJob.title,
        description: descricao || existingJob.description,
        category: categoria || existingJob.category,
        minValue: precoMin !== undefined ? parseFloat(precoMin) : existingJob.minValue,
        maxValue: precoMax !== undefined ? parseFloat(precoMax) : existingJob.maxValue,
        duration: prazo || existingJob.duration,
        location: localizacao || existingJob.location,
        requirements: requisitos || existingJob.requirements,
        benefits: beneficios || existingJob.benefits,
        published: published !== undefined ? published : existingJob.published
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
      message: 'Serviço atualizado com sucesso'
    })

  } catch (error) {
    console.error('Erro ao atualizar serviço:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE /api/jobs/[id] - Deletar serviço
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar se o serviço existe
    const existingJob = await prisma.job.findUnique({
      where: { id: params.id }
    })

    if (!existingJob) {
      return NextResponse.json(
        { success: false, error: 'Serviço não encontrado' },
        { status: 404 }
      )
    }

    // Deletar serviço (cascade vai deletar fotos e aplicações)
    await prisma.job.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Serviço deletado com sucesso'
    })

  } catch (error) {
    console.error('Erro ao deletar serviço:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

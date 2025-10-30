import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

// GET /api/corporations/[id] - Buscar corporação por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const corporation = await prisma.corporation.findUnique({
      where: { id: params.id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            level: true,
            active: true,
            createdAt: true
          }
        },
        jobs: {
          select: {
            id: true,
            title: true,
            category: true,
            published: true,
            views: true,
            createdAt: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        contacts: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            favorited: true,
            createdAt: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            users: true,
            jobs: true,
            contacts: true
          }
        }
      }
    })

    if (!corporation) {
      return NextResponse.json(
        { success: false, error: 'Corporação não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: corporation
    })

  } catch (error) {
    console.error('Erro ao buscar corporação:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT /api/corporations/[id] - Atualizar corporação
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {
      nome,
      email,
      telefone,
      cnpj,
      endereco,
      website,
      descricao,
      logo,
      active
    } = await request.json()

    // Verificar se a corporação existe
    const existingCorp = await prisma.corporation.findUnique({
      where: { id: params.id }
    })

    if (!existingCorp) {
      return NextResponse.json(
        { success: false, error: 'Corporação não encontrada' },
        { status: 404 }
      )
    }

    // Se email foi alterado, verificar se não existe outro com mesmo email
    if (email && email !== existingCorp.email) {
      const emailExists = await prisma.corporation.findUnique({
        where: { email }
      })

      if (emailExists) {
        return NextResponse.json(
          { success: false, error: 'Email já está em uso' },
          { status: 400 }
        )
      }
    }

    // Se CNPJ foi alterado, verificar se não existe outro com mesmo CNPJ
    if (cnpj && cnpj !== existingCorp.cnpj) {
      const cnpjExists = await prisma.corporation.findUnique({
        where: { cnpj }
      })

      if (cnpjExists) {
        return NextResponse.json(
          { success: false, error: 'CNPJ já está em uso' },
          { status: 400 }
        )
      }
    }

    // Atualizar corporação
    const corporation = await prisma.corporation.update({
      where: { id: params.id },
      data: {
        name: nome || existingCorp.name,
        email: email || existingCorp.email,
        phone: telefone || existingCorp.phone,
        cnpj: cnpj || existingCorp.cnpj,
        address: endereco || existingCorp.address,
        website: website || existingCorp.website,
        description: descricao || existingCorp.description,
        logo: logo || existingCorp.logo,
        active: active !== undefined ? active : existingCorp.active
      }
    })

    return NextResponse.json({
      success: true,
      data: corporation,
      message: 'Corporação atualizada com sucesso'
    })

  } catch (error) {
    console.error('Erro ao atualizar corporação:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE /api/corporations/[id] - Deletar corporação
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar se a corporação existe
    const existingCorp = await prisma.corporation.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            users: true,
            jobs: true,
            contacts: true
          }
        }
      }
    })

    if (!existingCorp) {
      return NextResponse.json(
        { success: false, error: 'Corporação não encontrada' },
        { status: 404 }
      )
    }

    // Verificar se há dados vinculados
    const hasData = existingCorp._count.users > 0 || 
                   existingCorp._count.jobs > 0 || 
                   existingCorp._count.contacts > 0

    if (hasData) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Não é possível deletar corporação com dados vinculados. Desative-a ao invés de deletar.' 
        },
        { status: 400 }
      )
    }

    // Deletar corporação
    await prisma.corporation.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Corporação deletada com sucesso'
    })

  } catch (error) {
    console.error('Erro ao deletar corporação:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

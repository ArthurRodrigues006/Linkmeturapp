import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

// GET /api/contacts/[id] - Buscar contato por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: params.id },
      include: {
        corporation: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    if (!contact) {
      return NextResponse.json(
        { success: false, error: 'Contato não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: contact
    })

  } catch (error) {
    console.error('Erro ao buscar contato:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT /api/contacts/[id] - Atualizar contato
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {
      nome,
      email,
      telefone,
      empresa,
      mensagem,
      favorited,
      status
    } = await request.json()

    // Verificar se o contato existe
    const existingContact = await prisma.contact.findUnique({
      where: { id: params.id }
    })

    if (!existingContact) {
      return NextResponse.json(
        { success: false, error: 'Contato não encontrado' },
        { status: 404 }
      )
    }

    // Atualizar contato
    const contact = await prisma.contact.update({
      where: { id: params.id },
      data: {
        name: nome || existingContact.name,
        email: email || existingContact.email,
        phone: telefone || existingContact.phone,
        company: empresa || existingContact.company,
        message: mensagem || existingContact.message,
        favorited: favorited !== undefined ? favorited : existingContact.favorited,
        status: status || existingContact.status
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
      message: 'Contato atualizado com sucesso'
    })

  } catch (error) {
    console.error('Erro ao atualizar contato:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE /api/contacts/[id] - Deletar contato
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar se o contato existe
    const existingContact = await prisma.contact.findUnique({
      where: { id: params.id }
    })

    if (!existingContact) {
      return NextResponse.json(
        { success: false, error: 'Contato não encontrado' },
        { status: 404 }
      )
    }

    // Deletar contato
    await prisma.contact.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Contato deletado com sucesso'
    })

  } catch (error) {
    console.error('Erro ao deletar contato:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

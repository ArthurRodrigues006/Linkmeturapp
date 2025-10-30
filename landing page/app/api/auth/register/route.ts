import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { 
      nome, 
      email, 
      senha, 
      telefone, 
      cnpj, 
      tipoUsuario 
    } = await request.json()

    // Validar dados obrigatórios
    if (!nome || !email || !senha) {
      return NextResponse.json(
        { success: false, error: 'Nome, email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 12)

    let corporation = null
    let corporationId = null

    // Se for empresa, criar corporação
    if (tipoUsuario === 'empresa' && cnpj) {
      // Verificar se CNPJ já existe
      const existingCorp = await prisma.corporation.findUnique({
        where: { cnpj }
      })

      if (existingCorp) {
        return NextResponse.json(
          { success: false, error: 'CNPJ já cadastrado' },
          { status: 400 }
        )
      }

      // Criar corporação
      corporation = await prisma.corporation.create({
        data: {
          name: nome,
          email: email,
          phone: telefone,
          cnpj: cnpj
        }
      })

      corporationId = corporation.id
    }

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name: nome,
        email: email,
        password: hashedPassword,
        phone: telefone,
        level: tipoUsuario === 'empresa' ? 2 : 1, // 2=admin empresa, 1=prestador
        corporationId: corporationId
      },
      include: {
        corporation: true
      }
    })

    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
        corporation
      },
      message: 'Cadastro realizado com sucesso'
    }, { status: 201 })

  } catch (error) {
    console.error('Erro no cadastro:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

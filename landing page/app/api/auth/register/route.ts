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
      cpf,
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

    // Validar CPF para prestadores
    if (tipoUsuario === 'prestador' && cpf) {
      const cpfNumeros = cpf.replace(/\D/g, '')
      
      if (cpfNumeros.length !== 11) {
        return NextResponse.json(
          { success: false, error: 'CPF deve conter exatamente 11 dígitos' },
          { status: 400 }
        )
      }

      // Verificar se CPF já existe
      const existingCpf = await prisma.user.findUnique({
        where: { cpf: cpfNumeros }
      })

      if (existingCpf) {
        return NextResponse.json(
          { success: false, error: 'CPF já cadastrado' },
          { status: 400 }
        )
      }
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
      // Validar formato do CNPJ (apenas números, 14 dígitos)
      const cnpjNumeros = cnpj.replace(/\D/g, '')
      
      if (cnpjNumeros.length !== 14) {
        return NextResponse.json(
          { success: false, error: 'CNPJ deve conter exatamente 14 dígitos' },
          { status: 400 }
        )
      }

      // Verificar se CNPJ já existe
      const existingCorp = await prisma.corporation.findUnique({
        where: { cnpj: cnpjNumeros }
      })

      if (existingCorp) {
        return NextResponse.json(
          { success: false, error: 'CNPJ já cadastrado' },
          { status: 400 }
        )
      }

      // Criar corporação (salvar CNPJ apenas com números)
      corporation = await prisma.corporation.create({
        data: {
          name: nome,
          email: email,
          phone: telefone,
          cnpj: cnpjNumeros
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
        cpf: tipoUsuario === 'prestador' && cpf ? cpf.replace(/\D/g, '') : null,
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

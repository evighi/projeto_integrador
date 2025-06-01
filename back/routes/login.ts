import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()
const router = Router()

router.post("/", async (req, res) => {
  const { email, senha } = req.body
  const mensaPadrao = "Login ou senha incorretos"

  if (!email || !senha) {
    return res.status(400).json({ erro: mensaPadrao })
  }

  try {
    // Verifica primeiro se é cliente
    const cliente = await prisma.cliente.findUnique({ where: { email } })

    if (cliente && bcrypt.compareSync(senha, cliente.senhaHash)) {
      const token = jwt.sign(
        {
          id: cliente.id,
          nome: cliente.nome,
          tipo: "cliente",
        },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" }
      )

      return res.status(200).json({
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        tipo: "cliente",
        podeAnunciarRevenda: cliente.podeAnunciarRevenda,
        token,
      })
    }

    // Se não é cliente, tenta como admin
    const admin = await prisma.admin.findUnique({ where: { email } })

    if (admin && bcrypt.compareSync(senha, admin.senhaHash)) {
      const token = jwt.sign(
        {
          id: admin.id,
          nome: admin.nome,
          tipo: "admin",
        },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" }
      )

      return res.status(200).json({
        id: admin.id,
        nome: admin.nome,
        email: admin.email,
        tipo: "admin",
        nivelPermissao: admin.nivelPermissao,
        token,
      })
    }

    // Nenhum encontrado ou senha inválida
    return res.status(400).json({ erro: mensaPadrao })
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno no login", detalhes: error })
  }
})

export default router

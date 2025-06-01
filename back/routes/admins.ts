import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { z } from "zod"

const router = Router()
const prisma = new PrismaClient()

const adminSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  senha: z.string().min(8),
  nivelPermissao: z.number().int().min(1).max(5), // exemplo
})

// Criar admin
router.post("/", async (req, res) => {
  const valida = adminSchema.safeParse(req.body)
  if (!valida.success) {
    return res.status(400).json({ erro: valida.error })
  }

  const { nome, email, senha, nivelPermissao } = valida.data

  // Verifica duplicidade de email
  const adminExistente = await prisma.admin.findUnique({ where: { email } })
  if (adminExistente) {
    return res.status(400).json({ erro: "E-mail já cadastrado para um admin" })
  }

  const senhaHash = bcrypt.hashSync(senha, 12)

  try {
    const novoAdmin = await prisma.admin.create({
      data: { nome, email, senhaHash, nivelPermissao }
    })
    res.status(201).json(novoAdmin)
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar admin" })
  }
})

// 📥 Buscar todos os admins
router.get("/", async (req, res) => {
  const admins = await prisma.admin.findMany()
  res.status(200).json(admins)
})

// 🔎 Buscar um admin por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const admin = await prisma.admin.findUnique({ where: { id } })
    if (!admin) {
      return res.status(404).json({ erro: "Admin não encontrado" })
    }
    res.status(200).json(admin)
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar admin" })
  }
})

// ✏️ Atualizar admin
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const dados = req.body

  try {
    const adminAtualizado = await prisma.admin.update({
      where: { id },
      data: dados,
    })
    res.status(200).json(adminAtualizado)
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar admin" })
  }
})

// ❌ Deletar admin
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    await prisma.admin.delete({ where: { id } })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar admin" })
  }
})

export default router

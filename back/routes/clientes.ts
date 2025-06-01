import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'
import { z } from 'zod'

const prisma = new PrismaClient()
const router = Router()

const clienteSchema = z.object({
  nome: z.string().min(10, { message: 'Nome deve possuir, no mínimo, 10 caracteres' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  senha: z.string(),
  numeroTelefone: z.string().min(10, { message: 'Número de telefone inválido' }) // novo campo
});


function validaSenha(senha: string) {
  const mensa: string[] = []

  if (senha.length < 8) {
    mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
  }

  let pequenas = 0, grandes = 0, numeros = 0, simbolos = 0

  for (const letra of senha) {
    if ((/[a-z]/).test(letra)) pequenas++
    else if ((/[A-Z]/).test(letra)) grandes++
    else if ((/[0-9]/).test(letra)) numeros++
    else simbolos++
  }

  if (pequenas === 0) mensa.push("Erro... senha deve possuir letra(s) minúscula(s)")
  if (grandes === 0) mensa.push("Erro... senha deve possuir letra(s) maiúscula(s)")
  if (numeros === 0) mensa.push("Erro... senha deve possuir número(s)")
  if (simbolos === 0) mensa.push("Erro... senha deve possuir símbolo(s)")

  return mensa
}

// Rota POST - cria cliente
router.post("/", async (req, res) => {
  const valida = clienteSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const erros = validaSenha(valida.data.senha)
  if (erros.length > 0) {
    res.status(400).json({ erro: erros.join("; ") })
    return
  }

  try {
    // 👉 Verifica se já existe cliente com o e-mail informado
    const clienteExistente = await prisma.cliente.findUnique({
      where: { email: valida.data.email }
    })

    if (clienteExistente) {
      res.status(400).json({ erro: "E-mail já cadastrado" })
      return
    }

    const hash = bcrypt.hashSync(valida.data.senha, 12)

    const cliente = await prisma.cliente.create({
      data: {
        nome: valida.data.nome,
        email: valida.data.email,
        numeroTelefone: valida.data.numeroTelefone,
        senhaHash: hash
      }
    })

    res.status(201).json(cliente)
  } catch (error) {
    res.status(400).json(error)
  }
})


// Rota GET - lista todos
router.get("/", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany()
    res.status(200).json(clientes)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Rota GET - busca por ID
router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id }
    })
    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" })
    }
    res.status(200).json(cliente)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router

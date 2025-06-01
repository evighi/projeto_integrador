import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface TokenPayload {
  id: string
  nome: string
  tipo: "cliente" | "admin"
  iat: number
  exp: number
}

export function autenticarToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as string) as TokenPayload
    req.user = decoded // adiciona info do usuário na requisição
    next()
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido ou expirado" })
  }
}

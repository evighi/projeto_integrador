import { Router } from 'express'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

const SYMPLA_TOKEN = process.env.SYMPLA_TOKEN
/* const ORGANIZADOR_ID = process.env.SYMPLA_ORGANIZADOR_ID */// se você quiser deixar isso dinâmico ou fixo

router.get('/importar-sympla', async (req, res) => {
  try {
    const response = await axios.get(`https://api.sympla.com.br/public/v3/events`, {
      headers: {
        'Authorization': `Bearer ${SYMPLA_TOKEN}`
      },
      params: {
        page_size: 10 // pode ajustar
      }
    })

    const eventos = response.data.data

    for (const evento of eventos) {
      await prisma.evento.upsert({
        where: { linkCompra: evento.url }, // identificador único
        update: {
          nome: evento.name,
          descricao: evento.description,
          dataHora: new Date(evento.start_date),
          local: evento.address,
          precoMinimo: evento.ticket_price_low || 0,
          precoMaximo: evento.ticket_price_high || 0,
          fonte: 'sympla',
          dataCaptura: new Date(),
          atualizadoEm: new Date()
        },
        create: {
          nome: evento.name,
          descricao: evento.description,
          dataHora: new Date(evento.start_date),
          local: evento.address,
          precoMinimo: evento.ticket_price_low || 0,
          precoMaximo: evento.ticket_price_high || 0,
          linkCompra: evento.url,
          fonte: 'sympla',
          dataCaptura: new Date(),
          atualizadoEm: new Date()
        }
      })
    }

    res.status(200).json({ message: 'Eventos importados com sucesso!' })

  } catch (error) {
    console.error('Erro ao buscar eventos da Sympla:', error)
    res.status(500).json({ error: 'Erro ao buscar eventos da Sympla' })
  }
})

// Rota para listar todos os eventos do banco de dados
router.get('/', async (req, res) => {
  try {
    const eventos = await prisma.evento.findMany({
      orderBy: {
        dataHora: 'asc' // ordena por data, opcional
      }
    });
    res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao listar eventos:', error);
    res.status(500).json({ error: 'Erro ao listar eventos' });
  }
});


export default router

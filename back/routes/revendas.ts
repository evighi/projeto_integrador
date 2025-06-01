import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.post("/", async (req, res) => {
    try {
        const {
            clienteId,
            eventoId,
            eventoLocal,
            quantidade,
            precoOriginal,
            precoRevenda,
            numeroTelefone,
            status,
            dataVenda, // opcional
        } = req.body;

        const revenda = await prisma.revenda.create({
            data: {
                clienteId,
                eventoLocal,
                quantidade: Number(quantidade),
                precoOriginal: parseFloat(precoOriginal),
                precoRevenda: parseFloat(precoRevenda),
                numeroTelefone,
                status,
                dataVenda: dataVenda ? new Date(dataVenda) : null
            },
        });

        res.status(201).json(revenda);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar revenda" });
    }
});

router.get("/", async (req, res) => {
    try {
        const revendas = await prisma.revenda.findMany({
            orderBy: { dataAnuncio: "desc" },
            include: {
                cliente: true,
            },
        });

        res.json(revendas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar as revendas." });
    }
});

export default router;  
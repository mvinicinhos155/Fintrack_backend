import { prisma } from "../lib/prisma";
import { Response } from "express";
import { User } from "../middlewares/auth";


class ControllerHistorico {
  async getHistorico( req: User, res:Response ) {
      try {
        const userId = req.user?.id;
            if(!userId) {
                return res.status(401).json({ error: "Não autorizado"});
            }

        const conta = await prisma.conta.findUnique({
            where: {
                userId
            }
        });

        if (!conta) {
            return res.status(404).json({
                error: "Conta não encontrada"
            });
        }

    const transacoes = await prisma.transacao.findMany({
        where: {
            OR: [
                {
                    contaOrigemId: conta.id
                },
                {
                    contaDestinoId: conta.id
                }
            ]
        },
        orderBy: {
            createdAt: "desc"
        },

        include: {
            contaDestino:{
                include:{
                    user: true
                }
            },

            contaOrigem: {
                include: {
                    user: true  
                }
            }
        }
    });

    return res.status(200).json({
        message: "Histórico encontrado",
        transacoes
    });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro interno do servidor"});
    }
  }
}

export default new ControllerHistorico;
import { prisma } from "../lib/prisma";
import { Response } from "express";
import { User } from "../middlewares/auth";
import { constants } from "node:buffer";

interface TypeTransfer {
    emailDestino: string
    valor: number
    descricao?: string
}

class ControllerTransfer {
    async transferBank( req: User, res: Response ) {
        try {

            const { emailDestino, valor, descricao } = req.body as TypeTransfer;


            const userId = req.user?.id;
                if(!userId) {
                    return res.status(401).json({ error: "Não autorizado"});
                }

            const contaOrigem = await prisma.conta.findUnique({
                where: { userId }
            });

                if (!contaOrigem) {
                    return res.status(404).json({
                    error: "Conta não encontrada"
                });

    }
                if(Number(contaOrigem.saldo) < valor ) {
                    return res.status(400).json({
                        error: "Saldo insuficiente"
                    })
                }

            const contaDestino = await prisma.conta.findFirst({
                where: {
                    user: {
                        email: emailDestino
                    }
                }
            });

            console.log("Conta destino:", contaDestino);

                if (!contaDestino) {
                    return res.status(404).json({
                    error: "Conta destino não encontrada"
                });
    }

            await prisma.$transaction(async (tx) => {
                await tx.conta.update({
                    where: {
                        id: contaOrigem.id
                    }, 
                    data: {
                        saldo: {
                            decrement: valor
                        }
                    }
                });

                await tx.conta.update({
                    where: {
                        id: contaDestino.id
                    }, 
                    data: {
                        saldo: {
                            increment: valor
                        }
                    }
                });

               const transacao = await tx.transacao.create({
                    data: {
                        valor,
                        descricao,
                        contaOrigemId: contaOrigem?.id,
                        contaDestinoId: contaDestino?.id
                    }
                });

                return res.status(201).json({ message: "Transação realizada com sucesso", transacao});
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor"});
        }
    }

    async depositBank( req: User, res: Response ) {
        try {
            const { valor } = req.body as TypeTransfer;

            const userId = req.user?.id;
                if(!userId) {
                    return res.status(401).json({ error: "Não autorizado"});
                }

            const conta = await prisma.conta.findUnique({
                where: { userId}
            });
                if(!conta) {
                    return res.status(404).json({
                    error: "Conta destino não encontrada"
                    });
                }

            await prisma.$transaction(async (tx) => {
                await tx.conta.update({
                    where: {
                        id: conta?.id
                    },
                    data:{
                        saldo: {
                            increment: valor
                        }
                    }
                });

                const deposito = await tx.transacao.create({
                    data: {
                        valor,
                        contaOrigemId: conta?.id,
                        tipo: "DEPOSITO"
                    }
                })

                return res.status(200).json({ message: "Deposito realizado com sucesso", deposito});
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor"});
        }
    }

    async withdrawBank( req: User, res: Response ) {
        try {
            const { valor } = req.body as TypeTransfer;

            const userId = req.user?.id;
                if (!userId) {
                  return res.status(401).json({ error: "Não autorizado"});  
                }

            const conta = await prisma.conta.findUnique({
                where: { userId}
            });
                if(!conta) {
                    return res.status(404).json({
                    error: "Conta destino não encontrada"
                    });
                }

            await prisma.$transaction(async (tx) => {
                await tx.conta.update({
                    where: {
                        id: conta?.id
                    },
                    data:{
                        saldo: {
                            decrement: valor
                        }
                    }
                });

                const saque = await tx.transacao.create({
                    data: {
                        valor,
                        contaOrigemId: conta?.id,
                        tipo: "SAQUE"
                    }
                });

                return res.status(200).json({ message: "Saque feito com sucesso", saque})
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor"});
        }
    }
}

export default new ControllerTransfer;
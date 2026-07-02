import { prisma } from "../lib/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../middlewares/auth";

interface TypeUser {
    name: string
    email: string
    password: string
}

type ParamsId = {
    id: string
}



class ControllerUser {
    async createUser( req: Request, res: Response ) {
        try {
            const { name, email, password } = req.body as TypeUser;

            const validPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            
                if(!validPassword.test(password)) {
                    return res.status(400).json({ error: "Senha deve conter letra maiúscula, número e 8 caracteres"});
                };

            const hashPassword = await bcrypt.hash(password, 10);

            const user = await prisma.usuario.create({
                data: {
                    name,
                    email,
                    password: hashPassword
                }
            });
                if(!user) {
                    return res.status(404).json({ error: "Erro ao criar usúario"});
                }

            const conta = await prisma.conta.create({
                data: {
                    userId: user.id,
                    saldo: 0
                }
            })

            user.password = "";

            return res.status(200).json({ message: "Usúario criado com sucesso", user, conta});

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor"});
        }
    }

    async getUsers( req: Request, res: Response ) {
        try {
            const users = await prisma.usuario.findMany();
                if(!users) {
                    return res.status(404).json({ error: "Erro ao listar todos usúarios"});
                }

            return res.status(201).json({ message: "Usúarios listado com sucesso!", users});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor"});
        }
    }

    async getUser( req: User, res: Response ) {
        try {
            const userId = req.user?.id;
                if(!userId) {
                    return res.status(401).json({ error: "Erro ao pegar usúario"});
                }

            const findUser = await prisma.usuario.findUnique({
                where: { id: userId },
                include:{
                    conta: true
                }
            });

            return res.status(201).json({ message: "Seja bem vindo a sua conta", findUser});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor"});
        }
    }

    async updateRole( req: Request<ParamsId>, res: Response ) {
        try {
            const { id } = req.params;
            const update =  await prisma.usuario.update({
                where: { id },
                data: {
                    role: "ADMIN"
                }
            });

            return res.status(200).json({ message: "Usúario atualizado com sucesso", update});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor"});
        }
    } 
} 

export default new ControllerUser;
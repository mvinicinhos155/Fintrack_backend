import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

interface Typelogin {
    email: string
    password: string
}

class ControllerLogin {
    async create( req: Request, res:Response ) {
        try {
            const { email,  password } = req.body as Typelogin;
            const user = await prisma.usuario.findUnique({
                where: { email }
            });
                if(!user) {
                    return res.status(404).json({ error: "Erro ao fazer login, tente novamente!"});
                };

            const validPassword = await bcrypt.compare(password, user.password);
                if(!validPassword) {
                    return res.status(401).json({ error: "Erro ao fazer login, tente novamente! "})
                };

            const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET as string, {expiresIn: "1h"});

            return res.status(201).json({ message: "login feito com sucesso!", user, token});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor"});
        }
    }
}

export default new ControllerLogin;
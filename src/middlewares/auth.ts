import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface Payload {
    id: string
    name: string
    email: string
    role: string
}

export interface User extends Request {
    user?: Payload
} 

export async function auth( req: User, res: Response, next: NextFunction) {
    const headers = req.headers.authorization as string;
        if(!headers) {
            return res.status(401).json({ error: "Não autorizado!"});
        }

        const token = headers.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as Payload;
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro interno do servidor"});
    }
}

export async function isAdmin( req: User, res: Response, next: NextFunction ) {
    if(!req.user){
        return res.status(401).json({ error: "Não autorizado!"});
    };

    if(req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "Não tem permisão para acessar essa rota!"});
    };

    next();
}
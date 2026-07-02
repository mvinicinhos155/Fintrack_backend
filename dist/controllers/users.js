"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
class ControllerUser {
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const validPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!validPassword.test(password)) {
                return res.status(400).json({ error: "Senha deve conter letra maiúscula, número e 8 caracteres" });
            }
            ;
            const hashPassword = await bcrypt_1.default.hash(password, 10);
            const user = await prisma_1.prisma.usuario.create({
                data: {
                    name,
                    email,
                    password: hashPassword
                }
            });
            if (!user) {
                return res.status(404).json({ error: "Erro ao criar usúario" });
            }
            const conta = await prisma_1.prisma.conta.create({
                data: {
                    userId: user.id,
                    saldo: 0
                }
            });
            user.password = "";
            return res.status(200).json({ message: "Usúario criado com sucesso", user, conta });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
    async getUsers(req, res) {
        try {
            const users = await prisma_1.prisma.usuario.findMany();
            if (!users) {
                return res.status(404).json({ error: "Erro ao listar todos usúarios" });
            }
            return res.status(201).json({ message: "Usúarios listado com sucesso!", users });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
    async getUser(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ error: "Erro ao pegar usúario" });
            }
            const findUser = await prisma_1.prisma.usuario.findUnique({
                where: { id: userId },
                include: {
                    conta: true
                }
            });
            return res.status(201).json({ message: "Seja bem vindo a sua conta", findUser });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
    async updateRole(req, res) {
        try {
            const { id } = req.params;
            const update = await prisma_1.prisma.usuario.update({
                where: { id },
                data: {
                    role: "ADMIN"
                }
            });
            return res.status(200).json({ message: "Usúario atualizado com sucesso", update });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}
exports.default = new ControllerUser;

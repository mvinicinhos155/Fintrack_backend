"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class ControllerLogin {
    async create(req, res) {
        try {
            const { email, password } = req.body;
            const user = await prisma_1.prisma.usuario.findUnique({
                where: { email }
            });
            if (!user) {
                return res.status(404).json({ error: "Erro ao fazer login, tente novamente!" });
            }
            ;
            const validPassword = await bcrypt_1.default.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: "Erro ao fazer login, tente novamente! " });
            }
            ;
            const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.status(201).json({ message: "login feito com sucesso!", user, token });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}
exports.default = new ControllerLogin;

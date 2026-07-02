"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
exports.isAdmin = isAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function auth(req, res, next) {
    const headers = req.headers.authorization;
    if (!headers) {
        return res.status(401).json({ error: "Não autorizado!" });
    }
    const token = headers.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
}
async function isAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ error: "Não autorizado!" });
    }
    ;
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "Não tem permisão para acessar essa rota!" });
    }
    ;
    next();
}

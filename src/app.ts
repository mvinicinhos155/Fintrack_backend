import express from "express";
import { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import routes from "./router/router";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/hello",  ( req: Request, res: Response ) => {
    return res.status(201).json({ message: "Hello world"});
});

export default app;
import { Router } from "express";
import users from "../controllers/users";
import login from "../controllers/login";
import { auth, isAdmin } from "../middlewares/auth";
import transfer from "../controllers/transfer";
import historico from "../controllers/historico";

const  routes = Router();

routes.post("/create/user", users.createUser);
routes.get("/find/users", auth, isAdmin, users.getUsers);
routes.get("/find/user", auth, users.getUser);
routes.put("/update/user/:id", auth, isAdmin ,users.updateRole);

routes.post("/login", login.create);

routes.post("/transfer", auth, transfer.transferBank);
routes.post("/deposit", auth, transfer.depositBank);
routes.post("/withdraw", auth, transfer.withdrawBank);

routes.get("/find/trasition", auth, historico.getHistorico);

export default routes;
import { Router } from "express";
import TransactionController from "./controllers/TransactionController";
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

routes.post("/user", new UserController().create);
routes.post("/login", new UserController().login);

routes.post("/transaction", authMiddleware, TransactionController.createCashOutTransaction)

routes.get("/profile", authMiddleware, new UserController().getProfile);

export default routes;

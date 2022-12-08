import { Router } from "express";
import AccountController from "./controllers/AccountController";
import TransactionController from "./controllers/TransactionController";
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { createMiddleware } from "./middlewares/createMiddleware";

const routes = Router();

routes.post("/user", createMiddleware, new UserController().create);
routes.post("/login", new UserController().login);

routes.post(
  "/transaction",
  authMiddleware,
  TransactionController.createCashOutTransaction
);

routes.get("/balance", authMiddleware, AccountController.balance);

routes.get("/transactions/:id", authMiddleware, TransactionController.findAll);

routes.get("/profile", authMiddleware, new UserController().getProfile);

export default routes;

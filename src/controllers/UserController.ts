import { Request, Response } from "express";
import UserService from "../services/UserService";
import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";
import AccountServices from "../services/AccountServices";
import jwt from "jsonwebtoken";

export default class UserController {
  async create(req: Request, res: Response) {
    let { username, password } = req.body;
    const userService = new UserService();
    const accountService = new AccountServices();

    if (!username || !password) {
      throw new BadRequestError("username/password are required.")
    }

    const hasUser = await userService.findOneByUsername(username);

    if (hasUser) {
      throw new BadRequestError("Username already exists!");
    }

    const account = await accountService.create(100);

    const user = await userService.create(username, password, account);

    return res.status(201).json({ user, account });
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const userService = new UserService();

    const user = await userService.login(username, password);

    if (!user) {
      throw new UnauthorizedError("Username or password incorrect!");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "", {
      expiresIn: "1d",
    });

    const { password: _, ...userLogin } = user;

    return res.json({
      user: userLogin,
      token: token,
    });
  }

  async getProfile(req: Request, res: Response) {
    return res.json(req.user);
  }
}

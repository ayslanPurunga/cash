import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import UserService from "../services/UserService";

export default class AccountController {
  async balance(req: Request, res: Response) {
    const loggedUser = req.user;
    const userServices = new UserService();

    try {
      const user = await userServices.findOne(loggedUser.id);

      return res.status(200).send(user);
    } catch (error) {
      throw new BadRequestError(error)
    }
  }
}

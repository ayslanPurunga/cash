import { Request, Response } from "express";
import UserService from "../services/UserService";

export default {
  async balance(req: Request, res: Response) {
    const loggedUser = req.user;
    const userServices = new UserService();

    try {
      const user = await userServices.findOne(loggedUser.id);

      return res.status(200).send(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

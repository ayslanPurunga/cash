import { Request, Response } from "express";


export class UserController {


    async getProfile(req: Request, res: Response) {
    return res.json(req.user);
  }
}

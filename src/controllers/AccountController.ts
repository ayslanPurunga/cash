import { Request, Response } from "express";
import { Accounts } from "../entities/Accounts";
import { AccountServices } from "../services/AccountServices";
import UserService from "../services/UserService";

export default {
	/*async findOne(req: Request, res: Response) {
		let { id } = req.params;
		const accountService = new AccountServices();
		try {
			const account = await accountService.findOne(id);

			if (!account) {
				return res
					.status(404)
					.send({ error: "Account not found with that id." });
			}

			return res.send(account);
		} catch (error) {
			return res.status(400).send(error);
		}
	},*/

	// async create(req: Request, res: Response) {
	// 	const accountService = new AccountServices();

	// 	try {
	// 		const newAccount = new Accounts();
	// 		newAccount.balance = 100.0;
	// 		const account = await accountService.create(newAccount);
	// 		return res.status(201).send(account);
	// 	} catch (error) {
	// 		return res.status(400).send(error);
	// 	}
	// },

	// async balance(req: Request, res: Response) {
	// 	const loggedUser = req.user;
	// 	const userServices = new UserService();
	// 	try {
	// 		const user = await userServices.findOne(loggedUser.id);
	// 		return res.status(200).send(user.account);
	// 	} catch (error) {
	// 		return res.status(400).send(error);
	// 	}
	// },
};
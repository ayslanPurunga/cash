import { Request, Response } from "express";
import UserService from "../services/UserService";
import { TransactionServices } from "../services/TransactionService";
import { Transactions } from "../entities/Transactions";
import { AccountServices } from "../services/AccountServices";

export default {
  async findAll(req: Request, res: Response) {
    const loggedUser = req.user;
    let type: string;
    const transactionServices = new TransactionServices();

    if (req.query.type === undefined) {
      type = "all";
    } else {
      type = req.query.type.toString();
    }

    try {
      const transactions = await transactionServices.findAll(
        loggedUser.account.id,
        type
      );
      res.status(200).send(transactions);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async createCashOutTransaction(req: Request, res: Response) {
    const loggedUser = req.user;

    const { username } = req.body;
    const balance = parseFloat(req.body.balance);
    const userServices = new UserService();
    const transactionServices = new TransactionServices();

    try {
      const userCashOut = await userServices.findOne(loggedUser.id);
      const userCashIn = await userServices.findOneByUsername(username);

      if (!userCashOut) {
        return res.status(403).send({
          errCode: 0,
          error: "User not found with username.",
        });
      }

      if (!userCashIn) {
        return res.status(403).send({
          errCode: 0,
          error: "User not found with username.",
        });
      }

      if (loggedUser.id === userCashIn.id) {
        return res.status(403).send({
          error: "A user cannot do transactions with himself.",
        });
      }

      const accountCashOut = userCashOut.account;
      const accountCashIn = userCashIn.account;

      if (accountCashOut.balance - balance < 0) {
        return res.status(403).send({
          errCode: 1,
          error: "User does not have enough balance for this operation.",
        });
      }

      accountCashOut.balance = accountCashOut.balance - balance;
      accountCashIn.balance = accountCashIn.balance + balance;

      const newTransaction = new Transactions();
      newTransaction.debitedAccountId = accountCashOut;
      newTransaction.creditedAccountId = accountCashIn;
      newTransaction.value = balance;
      newTransaction.created_at = new Date();

      const savedTransaction = await transactionServices.create(newTransaction);

      if (savedTransaction) {
        const accountService = new AccountServices();

        await accountService.updateBalance(accountCashOut);

        await accountService.updateBalance(accountCashIn);
      }

      res.status(200).send({
        savedTransaction: {
          transactions_created_at: savedTransaction.created_at,
          transactions_id: savedTransaction.id,
          transactions_value: savedTransaction.value,
          u_username: userCashIn.username,
          type: "cashOut",
        },
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

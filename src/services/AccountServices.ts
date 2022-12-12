import { UpdateResult } from "typeorm";
import { Accounts } from "../entities/Accounts";
import { accountRepository } from "../repositories/accountRepository";

export default class AccountServices {
  async create(balance: number): Promise<Accounts> {
    const newAccount = await accountRepository.save({ balance });
    return newAccount;
  }

  async findOne(id: number): Promise<Accounts | null> {
    const account = await accountRepository.findOneBy({ id });
    return account;
  }

  async updateBalance(account: Accounts): Promise<UpdateResult> {
    return accountRepository
      .createQueryBuilder()
      .update(account)
      .set({ balance: account.balance })
      .where("id = :id", { id: account.id })
      .execute();
  }
}

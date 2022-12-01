import { AppDataSource } from "../data-source";
import { Accounts } from "../entities/Accounts";


export const accountRepository = AppDataSource.getRepository(Accounts)
import { AppDataSource } from "../data-source";
import { Transactions } from "../entities/Transactions";


export const transactionRepository = AppDataSource.getRepository(Transactions)
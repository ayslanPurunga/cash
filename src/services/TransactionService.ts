import { Transactions } from "../entities/Transactions";
import { transactionRepository } from "../repositories/transactionRepository";

export class TransactionServices {
	async findOne(id: number): Promise<Transactions | null> {
		const transaction = await transactionRepository.findOneBy({ id });
		return transaction;
	}

	async findAll(id: number, type: string) {
		const builder =
			transactionRepository.createQueryBuilder("transactions");

		if (type === "all") {
			builder.where(
				"transactions.creditedAccountId = :id OR transactions.debitedAccountId = :id",
				{ id }
			);
		} else if (type === "cashIn") {
			builder.where("transactions.creditedAccountId = :id", { id });
		} else if (type === "cashOut") {
			builder.where("transactions.debitedAccountId = :id", { id });
		}
		const transactions = await builder.getMany();
		return transactions;
	}

	// async findAllWithUser(id: number) {
	// 	const builder =
	// 		transactionRepository.createQueryBuilder("transactions");
	// 	builder
	// 		.select("transactions.id")
	// 		.addSelect("u.username")
	// 		.addSelect("transactions.creditedAccountId")
	// 		.addSelect("transactions.debitedAccountId")
	// 		.addSelect("transactions.created_at")
	// 		.addSelect("transactions.value")
	// 		.innerJoin(
	// 			"users",
	// 			"u",
	// 			"transactions.creditedAccountId = u.accountId or transactions.debitedAccountId = u.accountId"
	// 		)
	// 		.distinct(true)
	// 		.where(
	// 			"transactions.creditedAccountId = :id OR transactions.debitedAccountId = :id",
	// 			{ id }
	// 		);
	// 	const transactions = await builder.getRawMany();
	// 	return transactions;
	// }

	async create(transaction: Transactions): Promise<Transactions> {
		const newTransaction = await transactionRepository.save(transaction);
		return newTransaction;
	}
}
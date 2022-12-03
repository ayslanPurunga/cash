import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transactions } from "./Transactions";

@Entity("accounts")
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float", default: 100 })
  balance: number;

  @OneToMany(() => Transactions, (transaction) => transaction.creditedAccountId)
  creditTransactions: Transactions[];

  @OneToMany(() => Transactions, (transaction) => transaction.debitedAccountId)
  debitTransactions: Transactions[];
}

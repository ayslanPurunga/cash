import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transactions } from "./Transactions";

@Entity("accounts")
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;

  @OneToMany(() => Transactions, (transactions) => transactions.accounts)
  transactions: Transactions[];
}

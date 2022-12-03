import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Accounts } from "./Accounts";

@Entity("transactions")
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Accounts, (account) => account.debitTransactions)
  @JoinColumn({ name: "debitedAccountId" })
  debitedAccountId: Accounts;

  @ManyToOne(() => Accounts, (account) => account.creditTransactions)
  @JoinColumn({ name: "creditedAccountId" })
  creditedAccountId: Accounts;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;
}

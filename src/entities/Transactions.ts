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

  @ManyToOne(() => Accounts, (accounts) => accounts.transactions)
  @JoinColumn([
    { name: "debitedAccountId", referencedColumnName: "id" },
    { name: "creditedAccountId", referencedColumnName: "id" },
  ])
  accounts: Accounts;

  @Column()
  value: string;

  @CreateDateColumn()
  created_at: Date;
}

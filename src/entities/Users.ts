import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Accounts } from "./Accounts";
import { Matches, MinLength } from "class-validator";
@Entity("users")
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @MinLength(3, {
    message: "Username is too short. Minimum of 3 characters.",
  })
  username: string;

  @Column()
  @MinLength(8, {
    message: "password is too short. Minimum of 8 characters.",
  })
  @Matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/, {
    message:
      "password must contain at least 8 characters, one number and one uppercase letter.",
  })
  password: string;

  @OneToOne(() => Accounts)
  @JoinColumn({ name: "accountId" })
  account: Accounts;
}

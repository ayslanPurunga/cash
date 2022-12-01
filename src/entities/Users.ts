import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Accounts } from "./Accounts";

@Entity("users")
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToOne(() => Accounts)
    @JoinColumn()
    account: Accounts


}
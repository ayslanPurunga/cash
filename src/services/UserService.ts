import { Users } from "../entities/Users";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import { Accounts } from "../entities/Accounts";

export default class UserService {
  async create(
    username: string,
    password: string,
    account: Accounts
  ): Promise<Users> {
    const user = new Users();

    user.username = username;
    user.password = await bcrypt.hash(password, 10);
    user.account = account;

    const newUser = await userRepository.save(user);
    return newUser;
  }

  async findOne(id: number) {
    const user = await userRepository.findOne({
      relations: { account: true },
      where: { id: id },
    });
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await userRepository.findOne({
      relations: { account: true },
      where: { username },
    });
    return user;
  }

  async login(username: string, password: string): Promise<Users | null> {
    const user = await this.findOneByUsername(username);

    if (!user) {
      return null;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return null;
    }

    return user;
  }
}

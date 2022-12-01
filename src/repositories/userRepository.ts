import { AppDataSource } from "../data-source";
import { Users } from "../entities/Users";


export const userRepository = AppDataSource.getRepository(Users)
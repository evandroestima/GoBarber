import "reflect-metadata";
import IUsersRepository from "../repositories/IUSersRepository";
import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";

interface Request {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}
import { injectable, inject } from "tsyringe";
import IHashProvider from "../providers/HashProvider/Models/IHashProviders";

@injectable()
class UpdateProfile {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuário non ecziste");
    }

    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists && emailExists.id != user_id) {
      throw new AppError("Este email já está cadastrado");
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError("Senha antiga não foi informada");
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      );

      if (!checkOldPassword) {
        throw new AppError("Senha antiga está errada");
      }
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfile;

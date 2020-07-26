import "reflect-metadata";
import IUsersRepository from "../repositories/IUSersRepository";
import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";

interface Request {
  user_id: string;
}
import { injectable, inject } from "tsyringe";

@injectable()
class ShowProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuário não existente");
    }
    return user;
  }
}

export default ShowProfileService;

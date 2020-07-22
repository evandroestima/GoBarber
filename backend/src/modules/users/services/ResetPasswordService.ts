import "reflect-metadata";
import IUsersRepository from "../repositories/IUSersRepository";
import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IUserTokensRepository from "../repositories/IUserTokensRepository";
import IHashProvider from "../providers/HashProvider/Models/IHashProviders";
import { addHours, isAfter } from "date-fns";

interface Request {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    @inject("HashProvider")
    private hashProvicer: IHashProvider
  ) {}

  public async execute({ token, password }: Request): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("user token doesnt exists");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("user token doesnt exists");
    }

    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate))
      throw new AppError("Token ja expirou");

    user.password = await this.hashProvicer.generateHash(password);
    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;

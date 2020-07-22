import "reflect-metadata";
import IUsersRepository from "../repositories/IUSersRepository";
import User from "../infra/typeorm/entities/User";
import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IMailProvider from "../../../shared/container/providers/MailProvider/Models/IMailProvider";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (!checkUserExists) {
      throw new AppError("User does not exists");
    }

    await this.userTokensRepository.generate(checkUserExists.id);

    this.mailProvider.sendMail(email, "teste");
  }
}

export default SendForgotPasswordEmailService;

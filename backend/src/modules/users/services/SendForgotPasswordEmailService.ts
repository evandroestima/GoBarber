import "reflect-metadata";
import path from "path";
import IUsersRepository from "../repositories/IUSersRepository";
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

    const { token } = await this.userTokensRepository.generate(
      checkUserExists.id
    );

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs"
    );

    await this.mailProvider.sendMail({
      to: {
        name: checkUserExists.name,
        email: checkUserExists.email,
      },
      subject: "[GoBarber] Recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: checkUserExists.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;

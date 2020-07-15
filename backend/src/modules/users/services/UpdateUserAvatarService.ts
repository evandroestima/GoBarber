import path from "path";
import fs from "fs";
import IUsersRepository from "../repositories/IUSersRepository";
import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";

interface Request {
  user_id: string;
  avatarFilename: string;
}
import uploadConfig from "@config/upload";
import { injectable, inject } from "tsyringe";

@injectable()
class UpadteUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Tem que estar logado pra trocar o avatar", 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);
    return user;
  }
}

export default UpadteUserAvatarService;
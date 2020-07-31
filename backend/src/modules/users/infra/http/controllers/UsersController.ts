import { Request, Response } from "express";
import { container } from "tsyringe";
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import CreateUserService from "@modules/users/services/CreateUserService";
import UpadteUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { classToClass } from "class-transformer";

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(200).json(classToClass(user));
  }

  public async patch(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpadteUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(classToClass(user));
  }
}

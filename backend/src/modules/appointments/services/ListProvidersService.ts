import "reflect-metadata";

interface Request {
  user_id: string;
}
import { injectable, inject } from "tsyringe";
import IUsersRepository from "@modules/users/repositories/IUSersRepository";
import User from "@modules/users/infra/typeorm/entities/User";

@injectable()
class ListProvidersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    return users;
  }
}

export default ListProvidersService;

import User from "../entities/User";
import { getRepository, Repository, Not } from "typeorm";
import IUsersRepository from "@modules/users/repositories/IUSersRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import usersRouter from "../../http/routes/users.routes";
import IFindAllProvidersDTO from "@modules/users/dtos/IFindAllProvidersDTO";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }
  public async findById(id: string): Promise<User | undefined> {
    //quando é id não precisa do where
    const user = await this.ormRepository.findOne(id);

    return user;
  }
  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];
    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }
  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  //essa parada na frente ali é o tipo do retorno
  public async create(userData: ICreateUserDTO): Promise<User> {
    const User = this.ormRepository.create(userData);

    await this.ormRepository.save(User);

    return User;
  }
}

export default UsersRepository;

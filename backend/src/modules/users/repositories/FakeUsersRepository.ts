import IUsersRepository from "@modules/users/repositories/IUSersRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/User";
import { uuid } from "uuidv4";

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id
    );

    this.users[findIndex] = user;

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id);

    return findUser;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }

  //essa parada na frente ali é o tipo do retorno
  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(
      user,
      {
        id: uuid(),
      },
      userData
    );

    this.users.push(user);

    return user;
  }
}

export default FakeUsersRepository;

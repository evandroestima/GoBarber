import FakeUsersRepository from "@modules/users/repositories/FakeUsersRepository";
import ListProvidersService from "./ListProvidersService";

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe("ListProviders", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it("should be able to list providers", async () => {
    const user1 = await fakeUsersRepository.create({
      name: "jorge",
      email: "1@2.com",
      password: "12",
    });

    const user2 = await fakeUsersRepository.create({
      name: "jooj",
      email: "1@3.com",
      password: "12",
    });

    const loggedUser = await fakeUsersRepository.create({
      name: "jojo",
      email: "1@4.com",
      password: "12",
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});

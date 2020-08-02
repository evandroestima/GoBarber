import CreateUserService from "./CreateUserService";
import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/Fakes/FakeHashProvider";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";

describe("CreateUser", () => {
  it("should be able to create a new User", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeCacheProvider = new FakeCacheProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );

    const User = await createUser.execute({
      name: "jorge",
      email: "jorge@jorge.com",
      password: "123123",
    });

    expect(User).toHaveProperty("id");
  });

  it("should not be able to create two Users with the same e-mail", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeCacheProvider = new FakeCacheProvider();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );

    await createUser.execute({
      name: "jorge",
      email: "jorge@jorge.com",
      password: "123123",
    });

    expect(
      createUser.execute({
        name: "jorge",
        email: "jorge@jorge.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

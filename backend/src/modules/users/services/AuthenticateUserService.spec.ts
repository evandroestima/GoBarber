import "reflect-metadata";
import AuthenticateUserService from "./AuthenticateUserService";
import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import FakeHashProvider from "../providers/HashProvider/Fakes/FakeHashProvider";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";

describe("AuthenticateUser", () => {
  it("should be able to Authenticate", async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeCacheProvider = new FakeCacheProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );

    const user = await createUser.execute({
      name: "jorge",
      email: "jorge@jorge.com",
      password: "123123",
    });

    const response = await authenticateUser.execute({
      email: "jorge@jorge.com",
      password: "123123",
    });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });

  it("should not be able to Authenticate with non existent user", async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authenticateUser.execute({
        email: "jorge@jorge.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to Authenticate with wrong password", async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeCacheProvider = new FakeCacheProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
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
      authenticateUser.execute({
        email: "jorge@jorge.com",
        password: "1231231",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

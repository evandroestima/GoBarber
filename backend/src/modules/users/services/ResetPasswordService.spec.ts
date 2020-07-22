import FakeUsersRepository from "../repositories/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/Fakes/FakeHashProvider";
import FakeUserTokensRepository from "../repositories/FakeUsersTokensRepository";
import ResetPasswordService from "./ResetPasswordService";
import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe("ResetPasswordService", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );
  });

  it("should be able to reset the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "jorge",
      email: "jorge@jorge.com",
      password: "123123",
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, "generateHash");

    await resetPassword.execute({
      password: "4132",
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith("4132");
    expect(updatedUser?.password).toBe("4132");
  });

  it("should not be able to reset the password with non-existing token", async () => {
    await expect(
      resetPassword.execute({
        token: "nem tem",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset the password with non-existing user", async () => {
    const { token } = await fakeUserTokensRepository.generate("nem tem");

    await expect(
      resetPassword.execute({
        token,
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset the password if past more than two hours", async () => {
    const user = await fakeUsersRepository.create({
      name: "jorge",
      email: "jorge@jorge.com",
      password: "123123",
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        token,
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

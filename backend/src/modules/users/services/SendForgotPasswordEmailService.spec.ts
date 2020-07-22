import FakeUsersRepository from "../repositories/FakeUsersRepository";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import FakeMailProvider from "../../../shared/container/providers/MailProvider/Fakes/FakeMailProvider";
import AppError from "@shared/errors/AppError";
import FakeUserTokensRepository from "../repositories/FakeUsersTokensRepository";

describe("SendForgotPasswordEmail", () => {
  it("should be able to recover the password using the email", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );

    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    await fakeUsersRepository.create({
      email: "1@2.com",
      name: "1",
      password: "123",
    });

    await sendForgotPasswordEmail.execute({
      email: "1@2.com",
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to recover a non-existing user password", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );

    await expect(
      sendForgotPasswordEmail.execute({
        email: "1@2.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should generate a forgot password token", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokensRepository = new FakeUserTokensRepository();

    const generateToken = jest.spyOn(fakeUserTokensRepository, "generate");

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );

    const user = await fakeUsersRepository.create({
      name: "1",
      email: "1@2.com",
      password: "1",
    });

    await sendForgotPasswordEmail.execute({
      email: "1@2.com",
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});

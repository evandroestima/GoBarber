import UpdateUserAvatarService from "./UpdateUserAvatarService";
import FakeUsersRepository from "../repositories/FakeUsersRepository";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/Fakes/FakeStorageProvider";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/Fakes/FakeHashProvider";
import UpdateProfile from "./UpdateProfileService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfile;

describe("UpdateProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfile(fakeUsersRepository, fakeHashProvider);
  });

  it("should be able to update an user's profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "jorge",
      email: "1@2.com",
      password: "12",
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "jooj",
      email: "1@3.com",
    });

    expect(updatedUser.name).toBe("jooj");
    expect(updatedUser.email).toBe("1@3.com");
  });

  it("should not be able to update an user's profile to an existent email", async () => {
    await fakeUsersRepository.create({
      name: "jorge",
      email: "1@4.com",
      password: "12",
    });

    const user = await fakeUsersRepository.create({
      name: "teste",
      email: "1@2.com",
      password: "23",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "jooj",
        email: "1@4.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to update the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "jorge",
      email: "1@2.com",
      password: "12",
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "jooj",
      email: "1@3.com",
      old_password: "12",
      password: "123",
    });

    expect(updatedUser.password).toBe("123");
  });

  it("should mot be able to update the password without the old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "jorge",
      email: "1@2.com",
      password: "12",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "jooj",
        email: "1@3.com",
        password: "123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should mot be able to update the password with wrong old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "jorge",
      email: "1@2.com",
      password: "12",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "jooj",
        email: "1@3.com",
        old_password: "13",
        password: "123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

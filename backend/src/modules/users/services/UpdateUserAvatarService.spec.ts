import UpdateUserAvatarService from "./UpdateUserAvatarService";
import FakeUsersRepository from "../repositories/FakeUsersRepository";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/Fakes/FakeStorageProvider";
import AppError from "@shared/errors/AppError";

describe("UpdateAvatar", () => {
  it("should be able to update an user's avatar", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: "jorge",
      email: "1@2.com",
      password: "12",
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "avatar.jpg",
    });

    expect(user.avatar).toBe("avatar.jpg");
  });

  it("should not be able to update avatar from a non existent user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    expect(
      updateUserAvatar.execute({
        user_id: "nem tem",
        avatarFilename: "avatar.jpg",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should delete old avatar when updating", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, "deleteFile");

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: "jorge",
      email: "1@2.com",
      password: "12",
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "avatar.jpg",
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "avatar2.jpg",
    });

    expect(deleteFile).toHaveBeenCalledWith("avatar.jpg");
    expect(user.avatar).toBe("avatar2.jpg");
  });
});

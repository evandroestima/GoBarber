import FakeUsersRepository from "../repositories/FakeUsersRepository";
import ShowProfileService from "./ShowProfileService";
import usersRouter from "../infra/http/routes/users.routes";
import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe("ShowProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it("should be show an user's profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "jorge",
      email: "1@2.com",
      password: "12",
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe("jorge");
    expect(profile.email).toBe("1@2.com");
  });

  it("should not be able to show an inexistent user", async () => {
    await expect(
      showProfile.execute({
        user_id: "ae",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

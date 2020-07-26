import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderDayAvailability from "./ListProviderDayAvailability";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailability;

describe("ListProviderDayAvailability", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailability(
      fakeAppointmentsRepository
    );
  });
  it("should be able to list the day availability from provider", async () => {
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 3, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 3, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: "user",
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ])
    );
  });
});

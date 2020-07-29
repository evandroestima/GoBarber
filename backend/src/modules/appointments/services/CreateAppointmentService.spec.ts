import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import CreateAppointmentService from "./CreateAppointmentService";
import AppError from "@shared/errors/AppError";
import FakeNotificationsRepository from "@modules/notifications/infra/typeorm/repositories/FakeNotificationsRepository";

describe("CreateAppointment", () => {
  it("should be able to create a new appointment", async () => {
    const fakeNotificationsRepository = new FakeNotificationsRepository();
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    );

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: "123123",
      user_id: "1231d23",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("123123");
  });

  it("should not be able to create two appointments at the same date", async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeNotificationsRepository = new FakeNotificationsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    );
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 11).getTime();
    });
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: "123123",
      user_id: "12312a3",
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: "123123",
        user_id: "1231a23",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  /*  it("shoudnt be able to create an appointment on a past date", async () => {
    const fakeNotificationsRepository = new FakeNotificationsRepository();
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    );

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: "1",
        user_id: "2",
      })
    ).rejects.toBeInstanceOf(AppError);
  }); */

  it("shoudnt be able to create an appointment with user_id = provider_id", async () => {
    const fakeNotificationsRepository = new FakeNotificationsRepository();
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    );

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: "1",
        user_id: "1",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shoudnt be able to create an appointment b4 8", async () => {
    const fakeNotificationsRepository = new FakeNotificationsRepository();
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    );

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: "1",
        user_id: "1a",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shoudnt be able to create an appointment b4 8", async () => {
    const fakeNotificationsRepository = new FakeNotificationsRepository();
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    );

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 19),
        provider_id: "1",
        user_id: "1a",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

import { container } from "tsyringe";
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import IUsersRepository from "@modules/users/repositories/IUSersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import "@modules/users/providers";
import "./providers";

container.registerSingleton<IAppointmentsRepository>(
  "AppointmentsRepository",
  AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

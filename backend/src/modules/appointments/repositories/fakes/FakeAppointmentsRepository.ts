import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import { uuid } from "uuidv4";
import { isEqual, getMonth, getYear, getDate } from "date-fns";
import IFindAllInMonthFromProvider from "@modules/appointments/dtos/IFindAllInMonthFromProviderDTO";
import IFindAllInDayFromProvider from "@modules/appointments/dtos/IFindAllInDayFromProviderDTO";

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  public async findAllInDayFromProvider({
    month,
    provider_id,
    year,
    day,
  }: IFindAllInDayFromProvider): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day
    );

    return appointments;
  }

  public async findAllInMonthFromProvider({
    month,
    provider_id,
    year,
  }: IFindAllInMonthFromProvider): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    );

    return appointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;

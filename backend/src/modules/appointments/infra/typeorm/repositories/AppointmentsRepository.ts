import Appointment from "../entities/Appointment";
import { getRepository, Repository, Raw } from "typeorm";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IFindAllInMonthFromProvider from "@modules/appointments/dtos/IFindAllInMonthFromProviderDTO";
import { parse } from "date-fns";
import IFindAllInDayFromProvider from "@modules/appointments/dtos/IFindAllInDayFromProviderDTO";

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findAllInDayFromProvider({
    month,
    provider_id,
    year,
    day,
  }: IFindAllInDayFromProvider): Promise<Appointment[]> {
    //esse padstart ve se o numero tem 2 digitos. se não tiver, bota um 0 na frente
    const parsedMonth = String(month).padStart(2, "0");
    const parsedDay = String(day).padStart(2, "0");

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw((dateFieldName) => {
          return `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`;
        }),
      },
    });

    await this.ormRepository.save(appointments);

    return appointments;
  }

  public async findAllInMonthFromProvider({
    month,
    provider_id,
    year,
  }: IFindAllInMonthFromProvider): Promise<Appointment[]> {
    //esse padstart ve se o numero tem 2 digitos. se não tiver, bota um 0 na frente
    const parsedMonth = String(month).padStart(2, "0");

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw((dateFieldName) => {
          return `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`;
        }),
      },
    });

    await this.ormRepository.save(appointments);

    return appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }
  //essa parada na frente ali é o tipo do retorno
  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;

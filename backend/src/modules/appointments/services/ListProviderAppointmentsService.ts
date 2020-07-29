import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import { getDaysInMonth, getDate } from "date-fns";
import Appointment from "../infra/typeorm/entities/Appointment";

interface Request {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    month,
    day,
    provider_id,
    year,
  }: Request): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        day,
        month,
        provider_id,
        year,
      }
    );

    return appointments;
  }
}
export default ListProviderAppointmentsService;

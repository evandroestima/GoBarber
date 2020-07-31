import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import { getDaysInMonth, getDate } from "date-fns";
import Appointment from "../infra/typeorm/entities/Appointment";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

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
    private appointmentsRepository: IAppointmentsRepository,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    month,
    day,
    provider_id,
    year,
  }: Request): Promise<Appointment[]> {
    const cacheData = await this.cacheProvider.recover("asd");

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        day,
        month,
        provider_id,
        year,
      }
    );

    /* await this.cacheProvider.save("asd", "asd");
     */
    return appointments;
  }
}
export default ListProviderAppointmentsService;

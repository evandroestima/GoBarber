import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface Request {
  provider_id: string;
  month: number;
  year: number;
}

type Response = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    month,
    provider_id,
    year,
  }: Request): Promise<Response> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        month: month,
        provider_id,
        year: year,
      }
    );
    console.log(appointments);

    return appointments;
  }
}
export default ListProviderMonthAvailabilityService;

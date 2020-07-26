import { injectable, inject } from "tsyringe";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import { getHours } from "date-fns";

interface Request {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type Response = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailability {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}
  public async execute({
    provider_id,
    year,
    month,
    day,
  }: Request): Promise<Response> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        day,
        month,
        provider_id,
        year,
      }
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart
    );

    const availability = eachHourArray.map((hour) => {
      const hasAppointmentInHour = appointments.find(
        (appointment) => getHours(appointment.date) === hour
      );

      return {
        hour,
        available: !hasAppointmentInHour,
      };
    });

    return availability;
  }
}
export default ListProviderDayAvailability;

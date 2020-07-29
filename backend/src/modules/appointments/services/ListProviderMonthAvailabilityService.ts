import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import { getDaysInMonth, getDate } from "date-fns";

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
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    );

    const availability = eachDayArray.map((day) => {
      const appointmensInDay = appointments.filter((appointment) => {
        return getDate(appointment.date) === day;
      });
      return {
        day,
        available: appointmensInDay.length < 10,
      };
    });

    return availability;
  }
}
export default ListProviderMonthAvailabilityService;

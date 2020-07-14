import { startOfHour } from "date-fns";
import AppError from "../../../shared/errors/AppError";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import { injectable, inject } from "tsyringe";

interface Request {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ date, provider_id }: Request) {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("Horário já reservado");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date,
    });

    return appointment;
  }
}

export default CreateAppointmentService;

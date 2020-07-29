import {
  startOfHour,
  isBefore,
  getHours,
  format,
  formatRelative,
} from "date-fns";
import AppError from "../../../shared/errors/AppError";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import { injectable, inject } from "tsyringe";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";

interface Request {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository,

    @inject("NotificationsRepository")
    private notificationsRepository: INotificationsRepository
  ) {}

  public async execute({ date, user_id, provider_id }: Request) {
    const appointmentDate = startOfHour(date);

    /* if (isBefore(appointmentDate, Date.now())) {
      console.log(appointmentDate);
      console.log(Date.now());
      throw new AppError(
        "Não é possível criar um appointment em uma data anterior"
      );
    } */

    if (user_id === provider_id) {
      throw new AppError("Impossível criar um agendamento consigo mesmo");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError("Só pode agendar das 8 às 17");
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("Horário já reservado");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date,
    });

    const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${dateFormated}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;

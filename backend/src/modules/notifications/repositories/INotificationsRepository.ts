import CreateNotificationDTO from "../dtos/CreateNotificationDTO";
import NotificationSchema from "../infra/typeorm/schemas/Notification";

export default interface INotificationsRepository {
  create(data: CreateNotificationDTO): Promise<NotificationSchema>;
}

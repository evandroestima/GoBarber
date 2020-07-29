import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import CreateNotificationDTO from "@modules/notifications/dtos/CreateNotificationDTO";
import NotificationSchema from "../schemas/Notification";
import { ObjectID } from "mongodb";

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: NotificationSchema[] = [];

  public async create({
    content,
    recipient_id,
  }: CreateNotificationDTO): Promise<NotificationSchema> {
    const notification = new NotificationSchema();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}
export default FakeNotificationsRepository;

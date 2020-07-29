import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import { getMongoRepository, MongoRepository } from "typeorm";
import CreateNotificationDTO from "@modules/notifications/dtos/CreateNotificationDTO";
import NotificationSchema from "../schemas/Notification";

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<NotificationSchema>;

  constructor() {
    this.ormRepository = getMongoRepository(NotificationSchema, "mongodb");
  }

  public async create({
    content,
    recipient_id,
  }: CreateNotificationDTO): Promise<NotificationSchema> {
    const notification = this.ormRepository.create({ content, recipient_id });

    await this.ormRepository.save(notification);

    return notification;
  }
}
export default NotificationsRepository;

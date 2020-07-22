import { container } from "tsyringe";
import IStorageProvider from "./StorageProvider/Models/IStorageProvider";
import DiskStorageProvider from "./StorageProvider/Implementations/DiskStorageProvider";
import IMailProvider from "./providers/MailProvider/Models/IMailProvider";
import EtherealMailProvider from "./providers/MailProvider/Implementations/EtherealMailProvider";

container.registerSingleton<IMailProvider>(
  "MailProvider",
  EtherealMailProvider
);
container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  DiskStorageProvider
);

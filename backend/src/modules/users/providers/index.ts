import { container } from "tsyringe";
import IHashProvider from "./HashProvider/Models/IHashProviders";
import BCryptHashProvider from "./HashProvider/Implementations/BCryptHashProvider";

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);

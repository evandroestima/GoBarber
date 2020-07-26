import ProvidersController from "../controllers/ProvidersController";
import { Router } from "express";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.get("/", providersController.index);

export default providersRouter;

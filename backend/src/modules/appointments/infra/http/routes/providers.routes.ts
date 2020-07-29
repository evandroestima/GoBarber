import ProvidersController from "../controllers/ProvidersController";
import { Router } from "express";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import ProviderMonthAvailabilityController from "../controllers/ProviderMonthAvailabilityController";
import ProviderDayAvailabilityController from "../controllers/ProviderDayAvailabilityController";
import { celebrate, Segments, Joi } from "celebrate";

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get("/", providersController.index);
providersRouter.get(
  "/:provider_id/month-availability",
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index
);
providersRouter.get(
  "/:provider_id/day-availability",
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index
);

export default providersRouter;

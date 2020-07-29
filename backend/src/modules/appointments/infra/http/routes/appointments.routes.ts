import { Router } from "express";
import ensureAuthenticated from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";
import AppointmentsController from "../controllers/AppointmentsController";
import ProviderAppointmentsController from "../controllers/ProviderAppointmentsController";
import { celebrate, Segments, Joi } from "celebrate";

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);
const appointmentsController = new AppointmentsController();
const providerAppointments = new ProviderAppointmentsController();

appointmentsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create
);
appointmentsRouter.get("/me", providerAppointments.index);

export default appointmentsRouter;

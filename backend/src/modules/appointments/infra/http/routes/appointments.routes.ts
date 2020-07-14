import { Router } from "express";
import ensureAuthenticated from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";
import AppointmentsController from "../controllers/AppointmentsController";

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);
const appointmentsController = new AppointmentsController();

/* appointmentsRouter.get("/", async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.status(200).json(appointments);
}); */

appointmentsRouter.post("/", appointmentsController.create);

export default appointmentsRouter;

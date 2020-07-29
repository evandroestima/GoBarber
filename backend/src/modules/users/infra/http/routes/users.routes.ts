import { Router } from "express";
import uploadConfig from "../../../../../config/upload";
import multer from "multer";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import UsersController from "../controllers/UsersController";
import { celebrate, Segments, Joi } from "celebrate";

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().email().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
);

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  usersController.patch
);

export default usersRouter;

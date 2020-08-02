import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import "express-async-errors";
import routes from "./routes";
import "../typeorm";
import cors from "cors";
import uploadConfig from "../../../config/upload";
import AppError from "../../errors/AppError";
import "@shared/container";
import { errors } from "celebrate";
import rateLimiter from "./middlewares/rateLimiter";

const app = express();

app.use(cors());

app.use(express.json());

app.use(rateLimiter);

app.use("/files", express.static(uploadConfig.uploadsFolder));

app.use(routes);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

app.listen(3333, () => {
  console.log("server started on port 3333");
});

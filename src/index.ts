import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { authentificationController } from "./di/config";
import { authentificationRouter } from "./core/features/authentification/infrastructure/authentification.route";
import { errorHandlerMiddleware } from "./shared/error-handler.middleware";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use("/auth", authentificationRouter(authentificationController));

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

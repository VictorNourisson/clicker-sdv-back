import dotenv from "dotenv";
dotenv.config();

import express from "express";
import swaggerUi from "swagger-ui-express";
import { authentificationController, sessionJeuController, possessionBatimentController } from "./di/config";
import { authentificationRouter } from "./core/features/authentification/infrastructure/authentification.route";
import { sessionJeuRouter } from "./core/features/session-jeu/infrastructure/session-jeu.route";
import { batimentRouter, sessionBatimentRouter } from "./core/features/possession-batiment/infrastructure/possession-batiment.route";
import { errorHandlerMiddleware } from "./shared/error-handler.middleware";
import { swaggerSpec } from "./shared/swagger";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authentificationRouter(authentificationController));
app.use("/session", sessionJeuRouter(sessionJeuController));
app.use("/batiments", batimentRouter(possessionBatimentController));
app.use("/session/batiments", sessionBatimentRouter(possessionBatimentController));

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

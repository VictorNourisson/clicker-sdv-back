import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import {
  authentificationController,
  sessionJeuController,
  possessionBatimentController,
  succesController,
} from "./di/config";
import { authentificationRouter } from "./core/features/authentification/infrastructure/authentification.route";
import { sessionJeuRouter } from "./core/features/session-jeu/infrastructure/session-jeu.route";
import { batimentRouter, sessionBatimentRouter } from "./core/features/possession-batiment/infrastructure/possession-batiment.route";
import { succesRouter, sessionSuccesRouter } from "./core/features/succes/infrastructure/succes.route";
import { errorHandlerMiddleware } from "./shared/error-handler.middleware";
import { swaggerSpec } from "./shared/swagger";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors({
  origin: [
    "https://csdv-frontend.onrender.com",
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/docs", (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers["authorization"];
  const user = process.env.SWAGGER_USER ?? "admin";
  const password = process.env.SWAGGER_PASSWORD ?? "admin";
  const expected = "Basic " + Buffer.from(`${user}:${password}`).toString("base64");

  if (!auth || auth !== expected) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Swagger"');
    res.status(401).send("Accès non autorisé.");
    return;
  }

  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authentificationRouter(authentificationController));
app.use("/session/batiments", sessionBatimentRouter(possessionBatimentController));
app.use("/session/succes", sessionSuccesRouter(succesController));
app.use("/session", sessionJeuRouter(sessionJeuController));
app.use("/batiments", batimentRouter(possessionBatimentController));
app.use("/succes", succesRouter(succesController));

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

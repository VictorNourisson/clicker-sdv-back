import { Router } from "express";
import { SessionJeuController } from "./session-jeu.controller";
import { authMiddleware } from "../../../../shared/auth.middleware";

export function sessionJeuRouter(controller: SessionJeuController): Router {
  const router = Router();

  router.use(authMiddleware);

  router.post("/", (req, res) => controller.creer(req, res));
  router.get("/", (req, res) => controller.recuperer(req, res));
  router.put("/", (req, res) => controller.sauvegarder(req, res));
  router.post("/prestige", (req, res) => controller.prestige(req, res));

  return router;
}

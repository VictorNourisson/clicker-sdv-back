import { Router } from "express";
import { PossessionBatimentController } from "./possession-batiment.controller";
import { authMiddleware } from "../../../../shared/auth.middleware";

export function batimentRouter(controller: PossessionBatimentController): Router {
  const router = Router();

  router.use(authMiddleware);

  router.get("/", (req, res) => controller.lister(req, res));

  return router;
}

export function sessionBatimentRouter(controller: PossessionBatimentController): Router {
  const router = Router();

  router.use(authMiddleware);

  router.get("/", (req, res) => controller.recupererPossessions(req, res));
  router.post("/acheter", (req, res) => controller.acheter(req, res));

  return router;
}

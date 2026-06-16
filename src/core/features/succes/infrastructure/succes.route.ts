import { Router } from "express";
import { authMiddleware } from "../../../../shared/auth.middleware";
import { SuccesController } from "./succes.controller";

export function succesRouter(controller: SuccesController): Router {
  const router = Router();

  router.use(authMiddleware);

  router.get("/", (req, res) => controller.lister(req, res));

  return router;
}

export function sessionSuccesRouter(controller: SuccesController): Router {
  const router = Router();

  router.use(authMiddleware);

  router.get("/", (req, res) => controller.recupererSession(req, res));
  router.post("/verifier", (req, res) => controller.verifierSession(req, res));
  router.post("/ajouter", (req, res) =>
    controller.ajouterSuccesObtenus(req, res),
  );

  return router;
}

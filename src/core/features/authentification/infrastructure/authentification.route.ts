import { Router } from "express";
import { AuthentificationController } from "./authentification.controller";

export function authentificationRouter(controller: AuthentificationController): Router {
  const router = Router();

  router.post("/inscription", (req, res) => controller.inscrire(req, res));
  router.post("/connexion", (req, res) => controller.connecter(req, res));

  return router;
}

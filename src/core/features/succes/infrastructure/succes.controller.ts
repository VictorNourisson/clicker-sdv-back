import { Request, Response } from "express";
import { ListerSucces } from "../application/lister-succes";
import { RecupererSuccesSession } from "../application/recuperer-succes-session";
import { VerifierSuccesSession } from "../application/verifier-succes-session";
import { AjouterSuccesObtenusSession } from "../application/ajouter-succes-obtenus-session";
import { Succes } from "../domain/succes";
import { SuccesSession } from "../domain/succes-session";

export class SuccesController {
  constructor(
    private readonly listerSucces: ListerSucces,
    private readonly recupererSuccesSession: RecupererSuccesSession,
    private readonly verifierSuccesSession: VerifierSuccesSession,
    private readonly ajouterSuccesObtenusSession: AjouterSuccesObtenusSession,
  ) {}

  async lister(_req: Request, res: Response): Promise<void> {
    const succes = await this.listerSucces.executer();

    res.status(200).json(succes.map((item) => this.mapperSucces(item)));
  }

  async recupererSession(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;

    const succes = await this.recupererSuccesSession.executer({
      utilisateurId,
    });

    res.status(200).json(succes.map((item) => this.mapperSuccesSession(item)));
  }

  async verifierSession(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;

    const succes = await this.verifierSuccesSession.executer({ utilisateurId });

    res.status(200).json(succes.map((item) => this.mapperSuccesSession(item)));
  }

  async ajouterSuccesObtenus(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;
    const succesIds = req.body as string[];

    if (
      !Array.isArray(succesIds) ||
      succesIds.some((id) => typeof id !== "string")
    ) {
      res
        .status(400)
        .json({ message: "succesIds must be an array of strings." });
      return;
    }

    await this.ajouterSuccesObtenusSession.executer({ utilisateurId, succesIds });

    res.status(200).json({ message: "Succes obtenus ajoutes." });
  }

  private mapperSucces(succes: Succes): Record<string, unknown> {
    return {
      id: succes.id,
      nom: succes.nom,
      description: succes.description,
      conditionType: succes.conditionType,
      conditionValeur: succes.conditionValeur?.toString() ?? null,
      icone: succes.icone,
    };
  }

  private mapperSuccesSession(
    succesSession: SuccesSession,
  ): Record<string, unknown> {
    return {
      ...this.mapperSucces(succesSession.succes),
      obtenu: succesSession.obtenu,
      obtenuLe: succesSession.obtenuLe,
    };
  }
}

import { Request, Response } from "express";
import { ListerSucces } from "../application/lister-succes";
import { RecupererSuccesSession } from "../application/recuperer-succes-session";
import { VerifierSuccesSession } from "../application/verifier-succes-session";
import { Succes } from "../domain/succes";
import { SuccesSession } from "../domain/succes-session";

export class SuccesController {
  constructor(
    private readonly listerSucces: ListerSucces,
    private readonly recupererSuccesSession: RecupererSuccesSession,
    private readonly verifierSuccesSession: VerifierSuccesSession
  ) {}

  async lister(_req: Request, res: Response): Promise<void> {
    const succes = await this.listerSucces.executer();

    res.status(200).json(succes.map((item) => this.mapperSucces(item)));
  }

  async recupererSession(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;

    const succes = await this.recupererSuccesSession.executer({ utilisateurId });

    res.status(200).json(succes.map((item) => this.mapperSuccesSession(item)));
  }

  async verifierSession(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;

    const succes = await this.verifierSuccesSession.executer({ utilisateurId });

    res.status(200).json(succes.map((item) => this.mapperSuccesSession(item)));
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

  private mapperSuccesSession(succesSession: SuccesSession): Record<string, unknown> {
    return {
      ...this.mapperSucces(succesSession.succes),
      obtenu: succesSession.obtenu,
      obtenuLe: succesSession.obtenuLe,
    };
  }
}

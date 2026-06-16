import { Request, Response } from "express";
import { CreerSessionJeu } from "../application/creer-session-jeu";
import { RecupererSessionJeu } from "../application/recuperer-session-jeu";
import { SauvegarderSessionJeu } from "../application/sauvegarder-session-jeu";
import { AppliquerPrestige } from "../application/appliquer-prestige";

export class SessionJeuController {
  constructor(
    private readonly creerSessionJeu: CreerSessionJeu,
    private readonly recupererSessionJeu: RecupererSessionJeu,
    private readonly sauvegarderSessionJeu: SauvegarderSessionJeu,
    private readonly appliquerPrestige: AppliquerPrestige
  ) {}

  async creer(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;

    await this.creerSessionJeu.executer({ utilisateurId });

    res.status(201).json({ message: "Session de jeu créée." });
  }

  async recuperer(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;

    const session = await this.recupererSessionJeu.executer({ utilisateurId });

    res.status(200).json({
      id: session.id,
      utilisateurId: session.utilisateurId,
      cookiesTotal: session.cookiesTotal.toString(),
      cookiesPerSecond: session.cookiesPerSecond.toString(),
      cookiesPerClick: session.cookiesPerClick.toString(),
      prestigeLevel: session.prestigeLevel,
      derniereSauvegarde: session.derniereSauvegarde,
      createdAt: session.createdAt,
    });
  }

  async sauvegarder(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;
    const { cookiesTotal, cookiesPerSecond, cookiesPerClick } = req.body as {
      cookiesTotal: string;
      cookiesPerSecond: string;
      cookiesPerClick: string;
    };

    await this.sauvegarderSessionJeu.executer({
      utilisateurId,
      cookiesTotal: BigInt(cookiesTotal),
      cookiesPerSecond: BigInt(cookiesPerSecond),
      cookiesPerClick: BigInt(cookiesPerClick),
    });

    res.status(200).json({ message: "Session sauvegardée." });
  }

  async prestige(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;

    await this.appliquerPrestige.executer({ utilisateurId });

    res.status(200).json({ message: "Prestige appliqué." });
  }
}

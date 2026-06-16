import { Request, Response } from "express";
import { CreerSessionJeu } from "../application/creer-session-jeu";
import { RecupererSessionJeu } from "../application/recuperer-session-jeu";
import { SauvegarderSessionJeu } from "../application/sauvegarder-session-jeu";
import { AppliquerPrestige } from "../application/appliquer-prestige";
import { RecupererClassement } from "../application/recuperer-classement";
import { DonneesSessionJeuInvalides } from "../domain/session-jeu.exception";

export class SessionJeuController {
  constructor(
    private readonly creerSessionJeu: CreerSessionJeu,
    private readonly recupererSessionJeu: RecupererSessionJeu,
    private readonly sauvegarderSessionJeu: SauvegarderSessionJeu,
    private readonly appliquerPrestige: AppliquerPrestige,
    private readonly recupererClassement: RecupererClassement
  ) {}

  async creer(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;

    await this.creerSessionJeu.executer({ utilisateurId });

    res.status(201).json({ message: "Session de jeu creee." });
  }

  async recuperer(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;

    const session = await this.recupererSessionJeu.executer({ utilisateurId });

    res.status(200).json({
      id: session.id,
      utilisateurId: session.utilisateurId,
      supsTotal: session.supsTotal.toString(),
      supsPerSecond: session.supsPerSecond.toString(),
      supsPerClick: session.supsPerClick.toString(),
      supsMonney: session.supsMonney,
      prestigeLevel: session.prestigeLevel,
      derniereSauvegarde: session.derniereSauvegarde,
      createdAt: session.createdAt,
    });
  }

  async sauvegarder(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;
    const { supsTotal, supsPerSecond, supsPerClick, supsMonney } = req.body as {
      supsTotal?: unknown;
      supsPerSecond?: unknown;
      supsPerClick?: unknown;
      supsMonney?: unknown;
    };

    await this.sauvegarderSessionJeu.executer({
      utilisateurId,
      supsTotal: this.convertirBigInt(supsTotal),
      supsPerSecond: this.convertirBigInt(supsPerSecond),
      supsPerClick: this.convertirBigInt(supsPerClick),
      supsMonney: this.convertirNombre(supsMonney),
    });

    res.status(200).json({ message: "Session sauvegardee." });
  }

  async prestige(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;

    await this.appliquerPrestige.executer({ utilisateurId });

    res.status(200).json({ message: "Prestige applique." });
  }

  async classement(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;

    const resultat = await this.recupererClassement.executer({ utilisateurId });

    res.status(200).json({
      top10: resultat.top10.map((e) => ({
        rang: e.rang,
        username: e.username,
        supsTotal: e.supsTotal.toString(),
      })),
      monRang: resultat.monRang
        ? {
            rang: resultat.monRang.rang,
            username: resultat.monRang.username,
            supsTotal: resultat.monRang.supsTotal.toString(),
          }
        : null,
    });
  }

  private convertirBigInt(valeur: unknown): bigint {
    if (typeof valeur !== "string" && typeof valeur !== "number") {
      throw new DonneesSessionJeuInvalides();
    }

    const valeurTexte = String(valeur);

    if (!/^\d+$/.test(valeurTexte)) {
      throw new DonneesSessionJeuInvalides();
    }

    return BigInt(valeurTexte);
  }

  private convertirNombre(valeur: unknown): number {
    if (typeof valeur !== "number" || !Number.isInteger(valeur) || valeur < 0) {
      throw new DonneesSessionJeuInvalides();
    }

    return valeur;
  }
}

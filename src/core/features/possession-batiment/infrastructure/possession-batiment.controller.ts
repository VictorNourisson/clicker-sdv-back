import { Request, Response } from "express";
import { SauvegarderPossessionBatiment } from "../application/sauvegarder-possession-batiment";
import { RecupererPossessionsSession } from "../application/recuperer-possessions-session";
import { ListerBatiments } from "../application/lister-batiments";

export class PossessionBatimentController {
  constructor(
    private readonly sauvegarderPossessionBatiment: SauvegarderPossessionBatiment,
    private readonly recupererPossessionsSession: RecupererPossessionsSession,
    private readonly listerBatiments: ListerBatiments
  ) {}

  async sauvegarder(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;
    const batiments = req.body as { batimentId: string; quantite: number }[];

    await this.sauvegarderPossessionBatiment.executer({ utilisateurId, batiments });

    res.status(200).json({ message: "Possessions sauvegardees." });
  }

  async recupererPossessions(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;

    const possessions = await this.recupererPossessionsSession.executer({ utilisateurId });

    res.status(200).json(
      possessions.map((possession) => ({
        batimentId: possession.batimentId,
        quantite: possession.quantite,
      }))
    );
  }

  async lister(req: Request, res: Response): Promise<void> {
    const batiments = await this.listerBatiments.executer();

    res.status(200).json(
      batiments.map((batiment) => ({
        id: batiment.id,
        nom: batiment.nom,
        description: batiment.description,
        coutBase: batiment.coutBase,
        multiplicateurCps: batiment.multiplicateurCps,
        ordreAffichage: batiment.ordreAffichage,
      }))
    );
  }
}

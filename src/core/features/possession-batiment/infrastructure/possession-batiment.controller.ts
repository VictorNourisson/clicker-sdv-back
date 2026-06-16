import { Request, Response } from "express";
import { AcheterBatiment } from "../application/acheter-batiment";
import { RecupererPossessionsSession } from "../application/recuperer-possessions-session";
import { ListerBatiments } from "../application/lister-batiments";

export class PossessionBatimentController {
  constructor(
    private readonly acheterBatiment: AcheterBatiment,
    private readonly recupererPossessionsSession: RecupererPossessionsSession,
    private readonly listerBatiments: ListerBatiments
  ) {}

  async acheter(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;
    const { batimentId, quantite } = req.body as {
      batimentId: string;
      quantite: number;
    };

    await this.acheterBatiment.executer({ utilisateurId, batimentId, quantite });

    res.status(200).json({ message: "Bâtiment acheté." });
  }

  async recupererPossessions(req: Request, res: Response): Promise<void> {
    const utilisateurId = req.utilisateurId as string;

    const possessions = await this.recupererPossessionsSession.executer({ utilisateurId });

    res.status(200).json(
      possessions.map((possession) => ({
        id: possession.id,
        sessionId: possession.sessionId,
        batimentId: possession.batimentId,
        quantite: possession.quantite,
        supsProduitsTotal: possession.supsProduitsTotal.toString(),
        premierAchat: possession.premierAchat,
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

import { v4 as uuidv4 } from "uuid";
import { PossessionBatiment } from "../domain/possession-batiment";
import { BatimentIntrouvable, SessionIntrouvable } from "../domain/possession-batiment.exception";
import { BatimentRepository } from "./ports/batiment.repository";
import { PossessionBatimentRepository } from "./ports/possession-batiment.repository";
import { SessionJeuQueryRepository } from "./ports/session-jeu.repository";

export type SauvegarderPossessionBatimentEntree = {
  batimentId: string;
  quantite: number;
};

export type SauvegarderPossessionBatimentCommande = {
  utilisateurId: string;
  batiments: SauvegarderPossessionBatimentEntree[];
};

export class SauvegarderPossessionBatiment {
  constructor(
    private readonly sessionJeuQueryRepository: SessionJeuQueryRepository,
    private readonly batimentRepository: BatimentRepository,
    private readonly possessionBatimentRepository: PossessionBatimentRepository
  ) {}

  async executer(commande: SauvegarderPossessionBatimentCommande): Promise<void> {
    const sessionId = await this.sessionJeuQueryRepository.trouverIdParUtilisateurId(
      commande.utilisateurId
    );

    if (sessionId === null) {
      throw new SessionIntrouvable();
    }

    for (const entree of commande.batiments) {
      const batiment = await this.batimentRepository.trouverParId(entree.batimentId);

      if (batiment === null) {
        throw new BatimentIntrouvable();
      }

      const existante = await this.possessionBatimentRepository.trouverParSessionEtBatiment(
        sessionId,
        entree.batimentId
      );

      if (existante === null) {
        await this.possessionBatimentRepository.sauvegarder(
          new PossessionBatiment({
            id: uuidv4(),
            sessionId,
            batimentId: entree.batimentId,
            quantite: entree.quantite,
            supsProduitsTotal: 0n,
            premierAchat: new Date(),
          })
        );
      } else {
        await this.possessionBatimentRepository.mettreAJour(
          new PossessionBatiment({
            id: existante.id,
            sessionId: existante.sessionId,
            batimentId: existante.batimentId,
            quantite: entree.quantite,
            supsProduitsTotal: existante.supsProduitsTotal,
            premierAchat: existante.premierAchat ?? new Date(),
          })
        );
      }
    }
  }
}

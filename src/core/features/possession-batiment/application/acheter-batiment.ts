import { v4 as uuidv4 } from "uuid";
import { PossessionBatiment } from "../domain/possession-batiment";
import { BatimentIntrouvable, SessionIntrouvable } from "../domain/possession-batiment.exception";
import { BatimentRepository } from "./ports/batiment.repository";
import { PossessionBatimentRepository } from "./ports/possession-batiment.repository";
import { SessionJeuQueryRepository } from "./ports/session-jeu.repository";

export type AcheterBatimentCommande = {
  utilisateurId: string;
  batimentId: string;
  quantite: number;
};

export class AcheterBatiment {
  constructor(
    private readonly sessionJeuQueryRepository: SessionJeuQueryRepository,
    private readonly batimentRepository: BatimentRepository,
    private readonly possessionBatimentRepository: PossessionBatimentRepository
  ) {}

  async executer(commande: AcheterBatimentCommande): Promise<void> {
    const sessionId = await this.sessionJeuQueryRepository.trouverIdParUtilisateurId(
      commande.utilisateurId
    );

    if (sessionId === null) {
      throw new SessionIntrouvable();
    }

    const batiment = await this.batimentRepository.trouverParId(commande.batimentId);

    if (batiment === null) {
      throw new BatimentIntrouvable();
    }

    const possessionExistante = await this.possessionBatimentRepository.trouverParSessionEtBatiment(
      sessionId,
      commande.batimentId
    );

    if (possessionExistante === null) {
      const nouvellePossession = new PossessionBatiment({
        id: uuidv4(),
        sessionId,
        batimentId: commande.batimentId,
        quantite: commande.quantite,
        supsProduitsTotal: 0n,
        premierAchat: new Date(),
      });

      await this.possessionBatimentRepository.sauvegarder(nouvellePossession);
    } else {
      const possessionMiseAJour = possessionExistante.acheter(commande.quantite);

      await this.possessionBatimentRepository.mettreAJour(possessionMiseAJour);
    }
  }
}

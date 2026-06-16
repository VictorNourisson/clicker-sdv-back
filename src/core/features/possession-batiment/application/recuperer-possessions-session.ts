import { PossessionBatiment } from "../domain/possession-batiment";
import { SessionIntrouvable } from "../domain/possession-batiment.exception";
import { PossessionBatimentRepository } from "./ports/possession-batiment.repository";
import { SessionJeuQueryRepository } from "./ports/session-jeu.repository";

export type RecupererPossessionsSessionCommande = {
  utilisateurId: string;
};

export class RecupererPossessionsSession {
  constructor(
    private readonly sessionJeuQueryRepository: SessionJeuQueryRepository,
    private readonly possessionBatimentRepository: PossessionBatimentRepository
  ) {}

  async executer(commande: RecupererPossessionsSessionCommande): Promise<PossessionBatiment[]> {
    const sessionId = await this.sessionJeuQueryRepository.trouverIdParUtilisateurId(
      commande.utilisateurId
    );

    if (sessionId === null) {
      throw new SessionIntrouvable();
    }

    return this.possessionBatimentRepository.listerParSession(sessionId);
  }
}

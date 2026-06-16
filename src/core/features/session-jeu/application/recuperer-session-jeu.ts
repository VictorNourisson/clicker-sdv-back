import { SessionJeu } from "../domain/session-jeu";
import { SessionJeuIntrouvable } from "../domain/session-jeu.exception";
import { SessionJeuRepository } from "./ports/session-jeu.repository";

export type RecupererSessionJeuCommande = {
  utilisateurId: string;
};

export class RecupererSessionJeu {
  constructor(private readonly sessionJeuRepository: SessionJeuRepository) {}

  async executer(commande: RecupererSessionJeuCommande): Promise<SessionJeu> {
    const session = await this.sessionJeuRepository.trouverParUtilisateurId(
      commande.utilisateurId
    );

    if (session === null) {
      throw new SessionJeuIntrouvable();
    }

    return session;
  }
}

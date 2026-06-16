import { SessionJeuIntrouvable } from "../domain/session-jeu.exception";
import { SessionJeuRepository } from "./ports/session-jeu.repository";

export type SauvegarderSessionJeuCommande = {
  utilisateurId: string;
  cookiesTotal: bigint;
  cookiesPerSecond: bigint;
  cookiesPerClick: bigint;
};

export class SauvegarderSessionJeu {
  constructor(private readonly sessionJeuRepository: SessionJeuRepository) {}

  async executer(commande: SauvegarderSessionJeuCommande): Promise<void> {
    const session = await this.sessionJeuRepository.trouverParUtilisateurId(
      commande.utilisateurId
    );

    if (session === null) {
      throw new SessionJeuIntrouvable();
    }

    const sessionMiseAJour = session.sauvegarder(
      commande.cookiesTotal,
      commande.cookiesPerSecond,
      commande.cookiesPerClick
    );

    await this.sessionJeuRepository.mettreAJour(sessionMiseAJour);
  }
}

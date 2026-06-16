import { SessionJeuIntrouvable } from "../domain/session-jeu.exception";
import { SessionJeuRepository } from "./ports/session-jeu.repository";

export type AppliquerPrestigeCommande = {
  utilisateurId: string;
};

export class AppliquerPrestige {
  constructor(private readonly sessionJeuRepository: SessionJeuRepository) {}

  async executer(commande: AppliquerPrestigeCommande): Promise<void> {
    const session = await this.sessionJeuRepository.trouverParUtilisateurId(
      commande.utilisateurId
    );

    if (session === null) {
      throw new SessionJeuIntrouvable();
    }

    const sessionApresPrestige = session.appliquerPrestige();

    await this.sessionJeuRepository.mettreAJour(sessionApresPrestige);
  }
}

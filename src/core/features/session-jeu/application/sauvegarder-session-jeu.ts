import { SessionJeuIntrouvable } from "../domain/session-jeu.exception";
import { SessionJeuRepository } from "./ports/session-jeu.repository";

export type SauvegarderSessionJeuCommande = {
  utilisateurId: string;
  supsTotal: bigint;
  supsPerSecond: bigint;
  supsPerClick: bigint;
  supsMonney: number;
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
      commande.supsTotal,
      commande.supsPerSecond,
      commande.supsPerClick,
      commande.supsMonney
    );

    await this.sessionJeuRepository.mettreAJour(sessionMiseAJour);
  }
}

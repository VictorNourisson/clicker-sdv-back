import { v4 as uuidv4 } from "uuid";
import { SessionJeu } from "../domain/session-jeu";
import { SessionJeuDejaExistante } from "../domain/session-jeu.exception";
import { SessionJeuRepository } from "./ports/session-jeu.repository";

export type CreerSessionJeuCommande = {
  utilisateurId: string;
};

export class CreerSessionJeu {
  constructor(private readonly sessionJeuRepository: SessionJeuRepository) {}

  async executer(commande: CreerSessionJeuCommande): Promise<void> {
    const existante = await this.sessionJeuRepository.trouverParUtilisateurId(
      commande.utilisateurId
    );

    if (existante !== null) {
      throw new SessionJeuDejaExistante();
    }

    const session = new SessionJeu({
      id: uuidv4(),
      utilisateurId: commande.utilisateurId,
      supsTotal: 0n,
      supsPerSecond: 0n,
      supsPerClick: 1n,
      supsMonney: 0,
      prestigeLevel: 0,
      derniereSauvegarde: new Date(),
      createdAt: new Date(),
    });

    await this.sessionJeuRepository.sauvegarder(session);
  }
}

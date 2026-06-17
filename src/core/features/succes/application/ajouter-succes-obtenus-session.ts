import { v4 as uuidv4 } from "uuid";
import { SuccesObtenu } from "../domain/succes-obtenu";
import { SuccesObtenuRepository } from "./ports/succes-obtenu.repository";
import { SessionJeuRepository } from "../../session-jeu/application/ports/session-jeu.repository";
import { SessionIntrouvable } from "../domain/succes.exception";

export type AjouterSuccesObtenusSessionCommande = {
  utilisateurId: string;
  succesIds: string[];
};

export class AjouterSuccesObtenusSession {
  constructor(
    private readonly sessionJeuRepository: SessionJeuRepository,
    private readonly succesObtenuRepository: SuccesObtenuRepository,
  ) {}

  async executer(commande: AjouterSuccesObtenusSessionCommande): Promise<void> {
    const session = await this.sessionJeuRepository.trouverParUtilisateurId(
      commande.utilisateurId,
    );

    if (session === null) {
      throw new SessionIntrouvable();
    }

    const sessionId = session.id;

    const succesObtenusExistants =
      await this.succesObtenuRepository.listerParSession(sessionId);

    const succesIdsExistants = new Set(
      succesObtenusExistants.map((succesObtenu) => succesObtenu.succesId),
    );

    for (const succesId of commande.succesIds) {
      if (succesIdsExistants.has(succesId)) {
        continue;
      }

      const succesObtenu = new SuccesObtenu({
        id: uuidv4(),
        sessionId,
        succesId,
        obtenuLe: new Date(),
      });

      await this.succesObtenuRepository.sauvegarder(succesObtenu);
    }
  }
}

import { v4 as uuidv4 } from "uuid";
import { SuccesObtenu } from "../domain/succes-obtenu";
import { SuccesObtenuRepository } from "./ports/succes-obtenu.repository";
import { SessionJeuRepository } from "../../session-jeu/application/ports/session-jeu.repository";
import { SessionIntrouvable } from "../domain/succes.exception";

export type AjouterSuccesObtenusSessionCommande = {
  sessionId: string;
  succesIds: string[];
};

export class AjouterSuccesObtenusSession {
  constructor(
    private readonly sessionJeuRepository: SessionJeuRepository,
    private readonly succesObtenuRepository: SuccesObtenuRepository,
  ) {}

  async executer(commande: AjouterSuccesObtenusSessionCommande): Promise<void> {
    const session = await this.sessionJeuRepository.trouverParId(
      commande.sessionId,
    );

    if (session === null) {
      throw new SessionIntrouvable();
    }

    const succesObtenusExistants =
      await this.succesObtenuRepository.listerParSession(commande.sessionId);

    const succesIdsExistants = new Set(
      succesObtenusExistants.map((succesObtenu) => succesObtenu.succesId),
    );

    for (const succesId of commande.succesIds) {
      if (succesIdsExistants.has(succesId)) {
        continue;
      }

      const succesObtenu = new SuccesObtenu({
        id: uuidv4(),
        sessionId: commande.sessionId,
        succesId,
        obtenuLe: new Date(),
      });

      await this.succesObtenuRepository.sauvegarder(succesObtenu);
    }
  }
}

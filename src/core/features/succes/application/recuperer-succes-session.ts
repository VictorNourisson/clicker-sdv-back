import { SuccesSession } from "../domain/succes-session";
import { SessionIntrouvable } from "../domain/succes.exception";
import { SessionJeuSuccesRepository } from "./ports/session-jeu.repository";
import { SuccesObtenuRepository } from "./ports/succes-obtenu.repository";
import { SuccesRepository } from "./ports/succes.repository";

export type RecupererSuccesSessionCommande = {
  utilisateurId: string;
};

export class RecupererSuccesSession {
  constructor(
    private readonly sessionJeuSuccesRepository: SessionJeuSuccesRepository,
    private readonly succesRepository: SuccesRepository,
    private readonly succesObtenuRepository: SuccesObtenuRepository,
  ) {}

  async executer(
    commande: RecupererSuccesSessionCommande,
  ): Promise<SuccesSession[]> {
    const progressionSession =
      await this.sessionJeuSuccesRepository.trouverProgressionParUtilisateurId(
        commande.utilisateurId,
      );

    if (progressionSession === null) {
      throw new SessionIntrouvable();
    }

    const [succes, succesObtenus] = await Promise.all([
      this.succesRepository.listerTous(),
      this.succesObtenuRepository.listerParSession(
        progressionSession.sessionId,
      ),
    ]);

    const succesObtenusParId = new Map(
      succesObtenus.map((succesObtenu) => [
        succesObtenu.succesId,
        succesObtenu,
      ]),
    );

    return succes
      .filter((item) => succesObtenusParId.has(item.id))
      .map(
        (item) =>
          new SuccesSession({
            succes: item,
            obtenuLe: succesObtenusParId.get(item.id)?.obtenuLe ?? null,
          }),
      );
  }
}

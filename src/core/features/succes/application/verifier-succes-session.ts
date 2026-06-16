import { v4 as uuidv4 } from "uuid";
import { ProgressionSucces } from "../domain/succes";
import { SuccesObtenu } from "../domain/succes-obtenu";
import { SuccesSession } from "../domain/succes-session";
import { SessionIntrouvable } from "../domain/succes.exception";
import { PossessionBatimentSuccesRepository } from "./ports/possession-batiment.repository";
import { SessionJeuSuccesRepository } from "./ports/session-jeu.repository";
import { SuccesObtenuRepository } from "./ports/succes-obtenu.repository";
import { SuccesRepository } from "./ports/succes.repository";

export type VerifierSuccesSessionCommande = {
  utilisateurId: string;
};

export class VerifierSuccesSession {
  constructor(
    private readonly sessionJeuSuccesRepository: SessionJeuSuccesRepository,
    private readonly possessionBatimentSuccesRepository: PossessionBatimentSuccesRepository,
    private readonly succesRepository: SuccesRepository,
    private readonly succesObtenuRepository: SuccesObtenuRepository,
  ) {}

  async executer(
    commande: VerifierSuccesSessionCommande,
  ): Promise<SuccesSession[]> {
    const progressionSession =
      await this.sessionJeuSuccesRepository.trouverProgressionParUtilisateurId(
        commande.utilisateurId,
      );

    if (progressionSession === null) {
      throw new SessionIntrouvable();
    }

    const [batimentsTotal, quantitesParBatiment, succes, succesObtenus] =
      await Promise.all([
        this.possessionBatimentSuccesRepository.calculerQuantiteTotaleParSession(
          progressionSession.sessionId,
        ),
        this.possessionBatimentSuccesRepository.obtenirQuantitesParBatimentParSession(
          progressionSession.sessionId,
        ),
        this.succesRepository.listerTous(),
        this.succesObtenuRepository.listerParSession(
          progressionSession.sessionId,
        ),
      ]);

    const progression: ProgressionSucces = {
      supsTotal: progressionSession.supsTotal,
      supsPerSecond: progressionSession.supsPerSecond,
      supsPerClick: progressionSession.supsPerClick,
      prestigeLevel: progressionSession.prestigeLevel,
      batimentsTotal,
      quantitesParBatiment,
    };
    const succesObtenusParId = new Map(
      succesObtenus.map((succesObtenu) => [
        succesObtenu.succesId,
        succesObtenu,
      ]),
    );

    for (const item of succes) {
      if (
        succesObtenusParId.has(item.id) ||
        !item.estDebloquePar(progression)
      ) {
        continue;
      }

      const succesObtenu = new SuccesObtenu({
        id: uuidv4(),
        sessionId: progressionSession.sessionId,
        succesId: item.id,
        obtenuLe: new Date(),
      });

      await this.succesObtenuRepository.sauvegarder(succesObtenu);
      succesObtenusParId.set(item.id, succesObtenu);
    }

    return succes.map(
      (item) =>
        new SuccesSession({
          succes: item,
          obtenuLe: succesObtenusParId.get(item.id)?.obtenuLe ?? null,
        }),
    );
  }
}

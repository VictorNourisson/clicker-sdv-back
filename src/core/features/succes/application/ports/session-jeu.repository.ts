export interface ProgressionSessionJeu {
  sessionId: string;
  supsTotal: bigint;
  supsPerSecond: bigint;
  supsPerClick: bigint;
  prestigeLevel: number;
}

export interface SessionJeuSuccesRepository {
  trouverProgressionParUtilisateurId(utilisateurId: string): Promise<ProgressionSessionJeu | null>;
}

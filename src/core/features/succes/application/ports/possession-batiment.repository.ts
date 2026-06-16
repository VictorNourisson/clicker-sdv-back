export interface PossessionBatimentSuccesRepository {
  calculerQuantiteTotaleParSession(sessionId: string): Promise<bigint>;
  obtenirQuantitesParBatimentParSession(
    sessionId: string,
  ): Promise<Map<string, bigint>>;
}

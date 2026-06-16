export interface PossessionBatimentSuccesRepository {
  calculerQuantiteTotaleParSession(sessionId: string): Promise<bigint>;
}

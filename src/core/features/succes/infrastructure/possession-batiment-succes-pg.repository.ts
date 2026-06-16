import { Pool } from "pg";
import { PossessionBatimentSuccesRepository } from "../application/ports/possession-batiment.repository";

export class PossessionBatimentSuccesPgRepository implements PossessionBatimentSuccesRepository {
  constructor(private readonly pool: Pool) {}

  async calculerQuantiteTotaleParSession(sessionId: string): Promise<bigint> {
    const result = await this.pool.query(
      `SELECT COALESCE(SUM(quantite), 0)::bigint AS total
       FROM possession_batiment
       WHERE session_id = $1`,
      [sessionId],
    );
    const row = result.rows[0] as Record<string, unknown> | undefined;

    return BigInt((row?.["total"] as string | undefined) ?? "0");
  }

  async obtenirQuantitesParBatimentParSession(
    sessionId: string,
  ): Promise<Map<string, bigint>> {
    const result = await this.pool.query(
      `SELECT batiment_id, quantite
       FROM possession_batiment
       WHERE session_id = $1`,
      [sessionId],
    );

    const quantitesMap = new Map<string, bigint>();
    for (const row of result.rows) {
      quantitesMap.set(
        row["batiment_id"] as string,
        BigInt(row["quantite"] as string | number),
      );
    }

    return quantitesMap;
  }
}

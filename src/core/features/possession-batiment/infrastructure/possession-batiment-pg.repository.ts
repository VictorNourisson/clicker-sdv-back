import { Pool } from "pg";
import { PossessionBatiment } from "../domain/possession-batiment";
import { PossessionBatimentRepository } from "../application/ports/possession-batiment.repository";

export class PossessionBatimentPgRepository implements PossessionBatimentRepository {
  constructor(private readonly pool: Pool) {}

  async trouverParSessionEtBatiment(
    sessionId: string,
    batimentId: string
  ): Promise<PossessionBatiment | null> {
    const result = await this.pool.query(
      `SELECT id, session_id, batiment_id, quantite, cookies_produits_total, premier_achat
       FROM possession_batiment
       WHERE session_id = $1 AND batiment_id = $2`,
      [sessionId, batimentId]
    );

    if (result.rows.length === 0) return null;

    return this.mapper(result.rows[0]);
  }

  async listerParSession(sessionId: string): Promise<PossessionBatiment[]> {
    const result = await this.pool.query(
      `SELECT id, session_id, batiment_id, quantite, cookies_produits_total, premier_achat
       FROM possession_batiment
       WHERE session_id = $1`,
      [sessionId]
    );

    return result.rows.map((row) => this.mapper(row));
  }

  async sauvegarder(possession: PossessionBatiment): Promise<void> {
    await this.pool.query(
      `INSERT INTO possession_batiment (id, session_id, batiment_id, quantite, cookies_produits_total, premier_achat)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        possession.id,
        possession.sessionId,
        possession.batimentId,
        possession.quantite,
        possession.cookiesProduitsTotal,
        possession.premierAchat,
      ]
    );
  }

  async mettreAJour(possession: PossessionBatiment): Promise<void> {
    await this.pool.query(
      `UPDATE possession_batiment
       SET quantite = $1, cookies_produits_total = $2
       WHERE id = $3`,
      [
        possession.quantite,
        possession.cookiesProduitsTotal,
        possession.id,
      ]
    );
  }

  private mapper(row: Record<string, unknown>): PossessionBatiment {
    return new PossessionBatiment({
      id: row["id"] as string,
      sessionId: row["session_id"] as string,
      batimentId: row["batiment_id"] as string,
      quantite: row["quantite"] as number,
      cookiesProduitsTotal: BigInt(row["cookies_produits_total"] as string),
      premierAchat: row["premier_achat"] ? new Date(row["premier_achat"] as string) : null,
    });
  }
}

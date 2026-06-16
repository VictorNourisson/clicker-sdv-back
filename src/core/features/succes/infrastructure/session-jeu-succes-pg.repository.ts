import { Pool } from "pg";
import {
  ProgressionSessionJeu,
  SessionJeuSuccesRepository,
} from "../application/ports/session-jeu.repository";

export class SessionJeuSuccesPgRepository implements SessionJeuSuccesRepository {
  constructor(private readonly pool: Pool) {}

  async trouverProgressionParUtilisateurId(
    utilisateurId: string
  ): Promise<ProgressionSessionJeu | null> {
    const result = await this.pool.query(
      `SELECT id,
              sups_total,
              sups_per_second,
              sups_per_click,
              prestige_level
       FROM session_jeu
       WHERE utilisateur_id = $1`,
      [utilisateurId]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0] as Record<string, unknown>;

    return {
      sessionId: row["id"] as string,
      supsTotal: BigInt(row["sups_total"] as string),
      supsPerSecond: BigInt(row["sups_per_second"] as string),
      supsPerClick: BigInt(row["sups_per_click"] as string),
      prestigeLevel: row["prestige_level"] as number,
    };
  }
}

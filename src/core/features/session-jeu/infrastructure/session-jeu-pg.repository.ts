import { Pool } from "pg";
import { SessionJeu } from "../domain/session-jeu";
import { SessionJeuRepository } from "../application/ports/session-jeu.repository";

export class SessionJeuPgRepository implements SessionJeuRepository {
  constructor(private readonly pool: Pool) {}

  async trouverParUtilisateurId(
    utilisateurId: string,
  ): Promise<SessionJeu | null> {
    const result = await this.pool.query(
      `SELECT id, utilisateur_id, sups_total, sups_per_second, sups_per_click,
              sups_money, prestige_level, derniere_sauvegarde, created_at
       FROM session_jeu WHERE utilisateur_id = $1`,
      [utilisateurId],
    );

    if (result.rows.length === 0) return null;

    return this.mapper(result.rows[0]);
  }

  async trouverParId(sessionId: string): Promise<SessionJeu | null> {
    const result = await this.pool.query(
      `SELECT id, utilisateur_id, sups_total, sups_per_second, sups_per_click,
              sups_money, prestige_level, derniere_sauvegarde, created_at
       FROM session_jeu WHERE id = $1`,
      [sessionId],
    );

    if (result.rows.length === 0) return null;

    return this.mapper(result.rows[0]);
  }

  async sauvegarder(session: SessionJeu): Promise<void> {
    await this.pool.query(
      `INSERT INTO session_jeu (id, utilisateur_id, sups_total, sups_per_second,
        sups_per_click, sups_money, prestige_level, derniere_sauvegarde, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        session.id,
        session.utilisateurId,
        session.supsTotal,
        session.supsPerSecond,
        session.supsPerClick,
        session.supsMonney,
        session.prestigeLevel,
        session.derniereSauvegarde,
        session.createdAt,
      ],
    );
  }

  async mettreAJour(session: SessionJeu): Promise<void> {
    await this.pool.query(
      `UPDATE session_jeu
       SET sups_total = $1, sups_per_second = $2, sups_per_click = $3,
           sups_money = $4, prestige_level = $5, derniere_sauvegarde = $6
       WHERE id = $7`,
      [
        session.supsTotal,
        session.supsPerSecond,
        session.supsPerClick,
        session.supsMonney,
        session.prestigeLevel,
        session.derniereSauvegarde,
        session.id,
      ],
    );
  }

  private mapper(row: Record<string, unknown>): SessionJeu {
    return new SessionJeu({
      id: row["id"] as string,
      utilisateurId: row["utilisateur_id"] as string,
      supsTotal: BigInt(row["sups_total"] as string),
      supsPerSecond: BigInt(row["sups_per_second"] as string),
      supsPerClick: BigInt(row["sups_per_click"] as string),
      supsMonney: row["sups_money"] as number,
      prestigeLevel: row["prestige_level"] as number,
      derniereSauvegarde: new Date(row["derniere_sauvegarde"] as string),
      createdAt: new Date(row["created_at"] as string),
    });
  }
}

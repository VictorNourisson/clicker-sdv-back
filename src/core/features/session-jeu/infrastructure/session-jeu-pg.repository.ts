import { Pool } from "pg";
import { SessionJeu } from "../domain/session-jeu";
import { SessionJeuRepository } from "../application/ports/session-jeu.repository";

export class SessionJeuPgRepository implements SessionJeuRepository {
  constructor(private readonly pool: Pool) {}

  async trouverParUtilisateurId(utilisateurId: string): Promise<SessionJeu | null> {
    const result = await this.pool.query(
      `SELECT id, utilisateur_id, cookies_total, cookies_per_second, cookies_per_click,
              prestige_level, derniere_sauvegarde, created_at
       FROM session_jeu WHERE utilisateur_id = $1`,
      [utilisateurId]
    );

    if (result.rows.length === 0) return null;

    return this.mapper(result.rows[0]);
  }

  async sauvegarder(session: SessionJeu): Promise<void> {
    await this.pool.query(
      `INSERT INTO session_jeu (id, utilisateur_id, cookies_total, cookies_per_second,
        cookies_per_click, prestige_level, derniere_sauvegarde, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        session.id,
        session.utilisateurId,
        session.cookiesTotal,
        session.cookiesPerSecond,
        session.cookiesPerClick,
        session.prestigeLevel,
        session.derniereSauvegarde,
        session.createdAt,
      ]
    );
  }

  async mettreAJour(session: SessionJeu): Promise<void> {
    await this.pool.query(
      `UPDATE session_jeu
       SET cookies_total = $1, cookies_per_second = $2, cookies_per_click = $3,
           prestige_level = $4, derniere_sauvegarde = $5
       WHERE id = $6`,
      [
        session.cookiesTotal,
        session.cookiesPerSecond,
        session.cookiesPerClick,
        session.prestigeLevel,
        session.derniereSauvegarde,
        session.id,
      ]
    );
  }

  private mapper(row: Record<string, unknown>): SessionJeu {
    return new SessionJeu({
      id: row["id"] as string,
      utilisateurId: row["utilisateur_id"] as string,
      cookiesTotal: BigInt(row["cookies_total"] as string),
      cookiesPerSecond: BigInt(row["cookies_per_second"] as string),
      cookiesPerClick: BigInt(row["cookies_per_click"] as string),
      prestigeLevel: row["prestige_level"] as number,
      derniereSauvegarde: new Date(row["derniere_sauvegarde"] as string),
      createdAt: new Date(row["created_at"] as string),
    });
  }
}

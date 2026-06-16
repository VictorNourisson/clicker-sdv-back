import { Pool } from "pg";
import { SessionJeuQueryRepository } from "../application/ports/session-jeu.repository";

export class SessionJeuQueryPgRepository implements SessionJeuQueryRepository {
  constructor(private readonly pool: Pool) {}

  async trouverIdParUtilisateurId(utilisateurId: string): Promise<string | null> {
    const result = await this.pool.query(
      `SELECT id FROM session_jeu WHERE utilisateur_id = $1`,
      [utilisateurId]
    );

    if (result.rows.length === 0) return null;

    return result.rows[0]["id"] as string;
  }
}

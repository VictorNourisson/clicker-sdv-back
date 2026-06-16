import { Pool } from "pg";
import { ClassementRepository, EntreeClassement } from "../application/ports/classement.repository";

export class ClassementPgRepository implements ClassementRepository {
  constructor(private readonly pool: Pool) {}

  async recupererTop10(): Promise<EntreeClassement[]> {
    const result = await this.pool.query<{
      rang: string;
      username: string;
      sups_total: string;
    }>(
      `SELECT RANK() OVER (ORDER BY sj.sups_total DESC) AS rang,
              u.username,
              sj.sups_total
       FROM session_jeu sj
       JOIN utilisateur u ON u.id = sj.utilisateur_id
       ORDER BY sj.sups_total DESC
       LIMIT 10`
    );

    return result.rows.map((row) => ({
      rang: Number(row.rang),
      username: row.username,
      supsTotal: BigInt(row.sups_total),
    }));
  }

  async recupererRangUtilisateur(utilisateurId: string): Promise<EntreeClassement | null> {
    const result = await this.pool.query<{
      rang: string;
      username: string;
      sups_total: string;
    }>(
      `SELECT rang, username, sups_total FROM (
         SELECT RANK() OVER (ORDER BY sj.sups_total DESC) AS rang,
                u.username,
                sj.sups_total,
                sj.utilisateur_id
         FROM session_jeu sj
         JOIN utilisateur u ON u.id = sj.utilisateur_id
       ) AS classement
       WHERE utilisateur_id = $1`,
      [utilisateurId]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0]!;
    return {
      rang: Number(row.rang),
      username: row.username,
      supsTotal: BigInt(row.sups_total),
    };
  }
}

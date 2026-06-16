import { Pool } from "pg";
import { SuccesObtenu } from "../domain/succes-obtenu";
import { SuccesObtenuRepository } from "../application/ports/succes-obtenu.repository";

export class SuccesObtenuPgRepository implements SuccesObtenuRepository {
  constructor(private readonly pool: Pool) {}

  async listerParSession(sessionId: string): Promise<SuccesObtenu[]> {
    const result = await this.pool.query(
      `SELECT id, session_id, succes_id, obtenu_le
       FROM succes_obtenu
       WHERE session_id = $1`,
      [sessionId]
    );

    return result.rows.map((row) => this.mapper(row));
  }

  async sauvegarder(succesObtenu: SuccesObtenu): Promise<void> {
    await this.pool.query(
      `INSERT INTO succes_obtenu (id, session_id, succes_id, obtenu_le)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (session_id, succes_id) DO NOTHING`,
      [
        succesObtenu.id,
        succesObtenu.sessionId,
        succesObtenu.succesId,
        succesObtenu.obtenuLe,
      ]
    );
  }

  private mapper(row: Record<string, unknown>): SuccesObtenu {
    return new SuccesObtenu({
      id: row["id"] as string,
      sessionId: row["session_id"] as string,
      succesId: row["succes_id"] as string,
      obtenuLe: new Date(row["obtenu_le"] as string),
    });
  }
}

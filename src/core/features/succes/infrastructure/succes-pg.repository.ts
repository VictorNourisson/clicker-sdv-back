import { Pool } from "pg";
import { Succes } from "../domain/succes";
import { SuccesRepository } from "../application/ports/succes.repository";

export class SuccesPgRepository implements SuccesRepository {
  constructor(private readonly pool: Pool) {}

  async listerTous(): Promise<Succes[]> {
    const result = await this.pool.query(
      `SELECT id, nom, description, condition_type, condition_valeur, icone
       FROM succes
       ORDER BY nom ASC`
    );

    return result.rows.map((row) => this.mapper(row));
  }

  private mapper(row: Record<string, unknown>): Succes {
    const conditionValeur = row["condition_valeur"];

    return new Succes({
      id: row["id"] as string,
      nom: row["nom"] as string,
      description: row["description"] as string | null,
      conditionType: row["condition_type"] as string | null,
      conditionValeur: conditionValeur === null ? null : BigInt(conditionValeur as string),
      icone: row["icone"] as string | null,
    });
  }
}

import { Pool } from "pg";
import { Batiment } from "../domain/batiment";
import { BatimentRepository } from "../application/ports/batiment.repository";

export class BatimentPgRepository implements BatimentRepository {
  constructor(private readonly pool: Pool) {}

  async trouverParId(id: string): Promise<Batiment | null> {
    const result = await this.pool.query(
      `SELECT id, nom, description, cout_base, multiplicateur_cps, ordre_affichage
       FROM batiment WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) return null;

    return this.mapper(result.rows[0]);
  }

  async listerTous(): Promise<Batiment[]> {
    const result = await this.pool.query(
      `SELECT id, nom, description, cout_base, multiplicateur_cps, ordre_affichage
       FROM batiment ORDER BY ordre_affichage ASC`
    );

    return result.rows.map((row) => this.mapper(row));
  }

  private mapper(row: Record<string, unknown>): Batiment {
    return new Batiment({
      id: row["id"] as string,
      nom: row["nom"] as string,
      description: row["description"] as string | null,
      coutBase: row["cout_base"] as number,
      multiplicateurCps: row["multiplicateur_cps"] as number,
      ordreAffichage: row["ordre_affichage"] as number,
    });
  }
}

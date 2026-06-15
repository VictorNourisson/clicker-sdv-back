import { Pool } from "pg";
import { Utilisateur } from "../domain/utilisateur";
import { UtilisateurRepository } from "../application/ports/utilisateur.repository";

export class UtilisateurPgRepository implements UtilisateurRepository {
  constructor(private readonly pool: Pool) {}

  async trouverParEmail(email: string): Promise<Utilisateur | null> {
    const result = await this.pool.query(
      "SELECT id, username, email, password_hash, created_at, last_login, is_active FROM utilisateur WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) return null;

    return this.mapper(result.rows[0]);
  }

  async trouverParUsername(username: string): Promise<Utilisateur | null> {
    const result = await this.pool.query(
      "SELECT id, username, email, password_hash, created_at, last_login, is_active FROM utilisateur WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) return null;

    return this.mapper(result.rows[0]);
  }

  async sauvegarder(utilisateur: Utilisateur): Promise<void> {
    await this.pool.query(
      `INSERT INTO utilisateur (id, username, email, password_hash, created_at, last_login, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        utilisateur.id,
        utilisateur.username,
        utilisateur.email,
        utilisateur.passwordHash,
        utilisateur.createdAt,
        utilisateur.lastLogin,
        utilisateur.isActive,
      ]
    );
  }

  private mapper(row: Record<string, unknown>): Utilisateur {
    return new Utilisateur({
      id: row["id"] as string,
      username: row["username"] as string,
      email: row["email"] as string,
      passwordHash: row["password_hash"] as string,
      createdAt: new Date(row["created_at"] as string),
      lastLogin: row["last_login"] ? new Date(row["last_login"] as string) : null,
      isActive: row["is_active"] as boolean,
    });
  }
}

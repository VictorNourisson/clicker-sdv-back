import { Utilisateur } from "../../domain/utilisateur";

export interface UtilisateurRepository {
  trouverParEmail(email: string): Promise<Utilisateur | null>;
  trouverParUsername(username: string): Promise<Utilisateur | null>;
  sauvegarder(utilisateur: Utilisateur): Promise<void>;
}

import { SessionJeu } from "../../domain/session-jeu";

export interface SessionJeuRepository {
  trouverParUtilisateurId(utilisateurId: string): Promise<SessionJeu | null>;
  sauvegarder(session: SessionJeu): Promise<void>;
  mettreAJour(session: SessionJeu): Promise<void>;
}

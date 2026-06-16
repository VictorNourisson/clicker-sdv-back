export interface SessionJeuQueryRepository {
  trouverIdParUtilisateurId(utilisateurId: string): Promise<string | null>;
}

import { PossessionBatiment } from "../../domain/possession-batiment";

export interface PossessionBatimentRepository {
  trouverParSessionEtBatiment(sessionId: string, batimentId: string): Promise<PossessionBatiment | null>;
  listerParSession(sessionId: string): Promise<PossessionBatiment[]>;
  sauvegarder(possession: PossessionBatiment): Promise<void>;
  mettreAJour(possession: PossessionBatiment): Promise<void>;
}

import { Batiment } from "../../domain/batiment";

export interface BatimentRepository {
  trouverParId(id: string): Promise<Batiment | null>;
  listerTous(): Promise<Batiment[]>;
}

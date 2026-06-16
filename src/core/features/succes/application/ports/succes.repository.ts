import { Succes } from "../../domain/succes";

export interface SuccesRepository {
  listerTous(): Promise<Succes[]>;
}

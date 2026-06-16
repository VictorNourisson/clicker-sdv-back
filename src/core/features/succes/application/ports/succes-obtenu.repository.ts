import { SuccesObtenu } from "../../domain/succes-obtenu";

export interface SuccesObtenuRepository {
  listerParSession(sessionId: string): Promise<SuccesObtenu[]>;
  sauvegarder(succesObtenu: SuccesObtenu): Promise<void>;
}

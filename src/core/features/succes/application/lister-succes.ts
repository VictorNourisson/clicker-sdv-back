import { Succes } from "../domain/succes";
import { SuccesRepository } from "./ports/succes.repository";

export class ListerSucces {
  constructor(private readonly succesRepository: SuccesRepository) {}

  async executer(): Promise<Succes[]> {
    return this.succesRepository.listerTous();
  }
}

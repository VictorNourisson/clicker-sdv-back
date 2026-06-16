import { Batiment } from "../domain/batiment";
import { BatimentRepository } from "./ports/batiment.repository";

export class ListerBatiments {
  constructor(private readonly batimentRepository: BatimentRepository) {}

  async executer(): Promise<Batiment[]> {
    return this.batimentRepository.listerTous();
  }
}

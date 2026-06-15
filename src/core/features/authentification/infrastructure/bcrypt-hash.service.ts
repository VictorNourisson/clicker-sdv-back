import bcrypt from "bcryptjs";
import { HashService } from "../application/ports/hash.service";

export class BcryptHashService implements HashService {
  private readonly saltRounds = 12;

  async hacher(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.saltRounds);
  }

  async comparer(plaintext: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plaintext, hash);
  }
}

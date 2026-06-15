import jwt from "jsonwebtoken";
import { TokenService } from "../application/ports/token.service";

export class JwtTokenService implements TokenService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor() {
    const secret = process.env.SUPABASE_JWT_SECRET ?? process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("SUPABASE_JWT_SECRET est manquant dans les variables d'environnement.");
    }
    this.secret = secret;
    this.expiresIn = process.env.JWT_EXPIRES_IN ?? "7d";
  }

  generer(payload: { userId: string; username: string }): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn } as jwt.SignOptions);
  }
}

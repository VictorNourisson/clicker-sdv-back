import "./express-request.augmentation";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppException } from "./app-exception";

class TokenManquant extends AppException {
  readonly statusCode = 401;
  constructor() {
    super("Token d'authentification manquant.");
  }
}

class TokenInvalide extends AppException {
  readonly statusCode = 401;
  constructor() {
    super("Token d'authentification invalide ou expiré.");
  }
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(new TokenManquant());
    return;
  }

  const token = authHeader.slice(7);
  const secret = process.env.SUPABASE_JWT_SECRET ?? process.env.JWT_SECRET;

  if (!secret) {
    next(new Error("SUPABASE_JWT_SECRET est manquant."));
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as { userId: string; username: string };
    req.utilisateurId = payload.userId;
    req.username = payload.username;
    next();
  } catch {
    next(new TokenInvalide());
  }
}

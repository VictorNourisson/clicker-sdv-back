import { AppException } from "../../../../shared/app-exception";

export class SessionIntrouvable extends AppException {
  readonly statusCode = 404;

  constructor() {
    super("Session de jeu introuvable.");
  }
}

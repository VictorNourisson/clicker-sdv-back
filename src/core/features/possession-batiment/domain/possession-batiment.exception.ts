import { AppException } from "../../../../shared/app-exception";

export class BatimentIntrouvable extends AppException {
  readonly statusCode = 404;

  constructor() {
    super("Bâtiment introuvable.");
  }
}

export class SessionIntrouvable extends AppException {
  readonly statusCode = 404;

  constructor() {
    super("Session de jeu introuvable.");
  }
}

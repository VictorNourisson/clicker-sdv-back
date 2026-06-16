import { AppException } from "../../../../shared/app-exception";

export class SessionJeuIntrouvable extends AppException {
  readonly statusCode = 404;

  constructor() {
    super("Aucune session de jeu trouvée pour cet utilisateur.");
  }
}

export class SessionJeuDejaExistante extends AppException {
  readonly statusCode = 409;

  constructor() {
    super("Une session de jeu existe déjà pour cet utilisateur.");
  }
}

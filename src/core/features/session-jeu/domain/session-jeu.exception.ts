import { AppException } from "../../../../shared/app-exception";

export class SessionJeuIntrouvable extends AppException {
  readonly statusCode = 404;

  constructor() {
    super("Aucune session de jeu trouvee pour cet utilisateur.");
  }
}

export class SessionJeuDejaExistante extends AppException {
  readonly statusCode = 409;

  constructor() {
    super("Une session de jeu existe deja pour cet utilisateur.");
  }
}

export class DonneesSessionJeuInvalides extends AppException {
  readonly statusCode = 400;

  constructor() {
    super("Les donnees de session sont invalides.");
  }
}

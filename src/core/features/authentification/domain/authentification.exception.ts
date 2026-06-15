import { AppException } from "../../../../shared/app-exception";

export class UtilisateurDejaExistant extends AppException {
  readonly statusCode = 409;

  constructor() {
    super("Un utilisateur avec cet email ou ce nom d'utilisateur existe déjà.");
  }
}

export class IdentifiantsInvalides extends AppException {
  readonly statusCode = 401;

  constructor() {
    super("Email ou mot de passe incorrect.");
  }
}

export class UtilisateurInactif extends AppException {
  readonly statusCode = 403;

  constructor() {
    super("Ce compte est désactivé.");
  }
}

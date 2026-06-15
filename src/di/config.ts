import { pool } from "../shared/db";
import { UtilisateurPgRepository } from "../core/features/authentification/infrastructure/utilisateur-pg.repository";
import { BcryptHashService } from "../core/features/authentification/infrastructure/bcrypt-hash.service";
import { JwtTokenService } from "../core/features/authentification/infrastructure/jwt-token.service";
import { InscrireUtilisateur } from "../core/features/authentification/application/inscrire-utilisateur";
import { ConnecterUtilisateur } from "../core/features/authentification/application/connecter-utilisateur";
import { AuthentificationController } from "../core/features/authentification/infrastructure/authentification.controller";

const utilisateurRepository = new UtilisateurPgRepository(pool);
const hashService = new BcryptHashService();
const tokenService = new JwtTokenService();

const inscrireUtilisateur = new InscrireUtilisateur(utilisateurRepository, hashService);
const connecterUtilisateur = new ConnecterUtilisateur(utilisateurRepository, hashService, tokenService);

export const authentificationController = new AuthentificationController(
  inscrireUtilisateur,
  connecterUtilisateur
);

import { pool } from "../shared/db";
import { UtilisateurPgRepository } from "../core/features/authentification/infrastructure/utilisateur-pg.repository";
import { BcryptHashService } from "../core/features/authentification/infrastructure/bcrypt-hash.service";
import { JwtTokenService } from "../core/features/authentification/infrastructure/jwt-token.service";
import { InscrireUtilisateur } from "../core/features/authentification/application/inscrire-utilisateur";
import { ConnecterUtilisateur } from "../core/features/authentification/application/connecter-utilisateur";
import { AuthentificationController } from "../core/features/authentification/infrastructure/authentification.controller";
import { SessionJeuPgRepository } from "../core/features/session-jeu/infrastructure/session-jeu-pg.repository";
import { CreerSessionJeu } from "../core/features/session-jeu/application/creer-session-jeu";
import { RecupererSessionJeu } from "../core/features/session-jeu/application/recuperer-session-jeu";
import { SauvegarderSessionJeu } from "../core/features/session-jeu/application/sauvegarder-session-jeu";
import { AppliquerPrestige } from "../core/features/session-jeu/application/appliquer-prestige";
import { SessionJeuController } from "../core/features/session-jeu/infrastructure/session-jeu.controller";
import { BatimentPgRepository } from "../core/features/possession-batiment/infrastructure/batiment-pg.repository";
import { PossessionBatimentPgRepository } from "../core/features/possession-batiment/infrastructure/possession-batiment-pg.repository";
import { SessionJeuQueryPgRepository } from "../core/features/possession-batiment/infrastructure/session-jeu-query-pg.repository";
import { AcheterBatiment } from "../core/features/possession-batiment/application/acheter-batiment";
import { RecupererPossessionsSession } from "../core/features/possession-batiment/application/recuperer-possessions-session";
import { ListerBatiments } from "../core/features/possession-batiment/application/lister-batiments";
import { PossessionBatimentController } from "../core/features/possession-batiment/infrastructure/possession-batiment.controller";
import { SuccesPgRepository } from "../core/features/succes/infrastructure/succes-pg.repository";
import { SuccesObtenuPgRepository } from "../core/features/succes/infrastructure/succes-obtenu-pg.repository";
import { SessionJeuSuccesPgRepository } from "../core/features/succes/infrastructure/session-jeu-succes-pg.repository";
import { PossessionBatimentSuccesPgRepository } from "../core/features/succes/infrastructure/possession-batiment-succes-pg.repository";
import { ListerSucces } from "../core/features/succes/application/lister-succes";
import { RecupererSuccesSession } from "../core/features/succes/application/recuperer-succes-session";
import { VerifierSuccesSession } from "../core/features/succes/application/verifier-succes-session";
import { SuccesController } from "../core/features/succes/infrastructure/succes.controller";

const utilisateurRepository = new UtilisateurPgRepository(pool);
const hashService = new BcryptHashService();
const tokenService = new JwtTokenService();

const inscrireUtilisateur = new InscrireUtilisateur(utilisateurRepository, hashService);
const connecterUtilisateur = new ConnecterUtilisateur(utilisateurRepository, hashService, tokenService);

export const authentificationController = new AuthentificationController(
  inscrireUtilisateur,
  connecterUtilisateur
);

const sessionJeuRepository = new SessionJeuPgRepository(pool);
const creerSessionJeu = new CreerSessionJeu(sessionJeuRepository);
const recupererSessionJeu = new RecupererSessionJeu(sessionJeuRepository);
const sauvegarderSessionJeu = new SauvegarderSessionJeu(sessionJeuRepository);
const appliquerPrestige = new AppliquerPrestige(sessionJeuRepository);

export const sessionJeuController = new SessionJeuController(
  creerSessionJeu,
  recupererSessionJeu,
  sauvegarderSessionJeu,
  appliquerPrestige
);

const batimentRepository = new BatimentPgRepository(pool);
const possessionBatimentRepository = new PossessionBatimentPgRepository(pool);
const sessionJeuQueryRepository = new SessionJeuQueryPgRepository(pool);

const acheterBatiment = new AcheterBatiment(
  sessionJeuQueryRepository,
  batimentRepository,
  possessionBatimentRepository
);
const recupererPossessionsSession = new RecupererPossessionsSession(
  sessionJeuQueryRepository,
  possessionBatimentRepository
);
const listerBatiments = new ListerBatiments(batimentRepository);

export const possessionBatimentController = new PossessionBatimentController(
  acheterBatiment,
  recupererPossessionsSession,
  listerBatiments
);

const succesRepository = new SuccesPgRepository(pool);
const succesObtenuRepository = new SuccesObtenuPgRepository(pool);
const sessionJeuSuccesRepository = new SessionJeuSuccesPgRepository(pool);
const possessionBatimentSuccesRepository = new PossessionBatimentSuccesPgRepository(pool);

const listerSucces = new ListerSucces(succesRepository);
const recupererSuccesSession = new RecupererSuccesSession(
  sessionJeuSuccesRepository,
  succesRepository,
  succesObtenuRepository
);
const verifierSuccesSession = new VerifierSuccesSession(
  sessionJeuSuccesRepository,
  possessionBatimentSuccesRepository,
  succesRepository,
  succesObtenuRepository
);

export const succesController = new SuccesController(
  listerSucces,
  recupererSuccesSession,
  verifierSuccesSession
);

import { IdentifiantsInvalides, UtilisateurInactif } from "../domain/authentification.exception";
import { UtilisateurRepository } from "./ports/utilisateur.repository";
import { HashService } from "./ports/hash.service";
import { TokenService } from "./ports/token.service";

export interface ConnecterUtilisateurCommande {
  email: string;
  password: string;
}

export interface ConnecterUtilisateurResultat {
  token: string;
  userId: string;
  username: string;
}

export class ConnecterUtilisateur {
  constructor(
    private readonly utilisateurRepository: UtilisateurRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService
  ) {}

  async executer(commande: ConnecterUtilisateurCommande): Promise<ConnecterUtilisateurResultat> {
    const utilisateur = await this.utilisateurRepository.trouverParEmail(commande.email);

    if (utilisateur === null) {
      throw new IdentifiantsInvalides();
    }

    if (!utilisateur.isActive) {
      throw new UtilisateurInactif();
    }

    const motDePasseValide = await this.hashService.comparer(
      commande.password,
      utilisateur.passwordHash
    );

    if (!motDePasseValide) {
      throw new IdentifiantsInvalides();
    }

    const token = this.tokenService.generer({
      userId: utilisateur.id,
      username: utilisateur.username,
    });

    return { token, userId: utilisateur.id, username: utilisateur.username };
  }
}

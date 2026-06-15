import { v4 as uuidv4 } from "uuid";
import { Utilisateur } from "../domain/utilisateur";
import { UtilisateurDejaExistant } from "../domain/authentification.exception";
import { UtilisateurRepository } from "./ports/utilisateur.repository";
import { HashService } from "./ports/hash.service";

export interface InscrireUtilisateurCommande {
  username: string;
  email: string;
  password: string;
}

export class InscrireUtilisateur {
  constructor(
    private readonly utilisateurRepository: UtilisateurRepository,
    private readonly hashService: HashService
  ) {}

  async executer(commande: InscrireUtilisateurCommande): Promise<void> {
    const [parEmail, parUsername] = await Promise.all([
      this.utilisateurRepository.trouverParEmail(commande.email),
      this.utilisateurRepository.trouverParUsername(commande.username),
    ]);

    if (parEmail !== null || parUsername !== null) {
      throw new UtilisateurDejaExistant();
    }

    const passwordHash = await this.hashService.hacher(commande.password);

    const utilisateur = new Utilisateur({
      id: uuidv4(),
      username: commande.username,
      email: commande.email,
      passwordHash,
      createdAt: new Date(),
      lastLogin: null,
      isActive: true,
    });

    await this.utilisateurRepository.sauvegarder(utilisateur);
  }
}

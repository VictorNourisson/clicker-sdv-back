import { EntreeClassement, ClassementRepository } from "./ports/classement.repository";

export type RecupererClassementCommande = {
  utilisateurId: string;
};

export type ResultatClassement = {
  top10: EntreeClassement[];
  monRang: EntreeClassement | null;
};

export class RecupererClassement {
  constructor(private readonly classementRepository: ClassementRepository) {}

  async executer(commande: RecupererClassementCommande): Promise<ResultatClassement> {
    const [top10, monRang] = await Promise.all([
      this.classementRepository.recupererTop10(),
      this.classementRepository.recupererRangUtilisateur(commande.utilisateurId),
    ]);

    const estDansTop10 = monRang !== null && monRang.rang <= 10;

    return { top10, monRang: estDansTop10 ? null : monRang };
  }
}

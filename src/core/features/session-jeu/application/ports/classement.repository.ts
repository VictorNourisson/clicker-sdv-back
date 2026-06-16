export type EntreeClassement = {
  rang: number;
  username: string;
  supsTotal: bigint;
};

export interface ClassementRepository {
  recupererTop10(): Promise<EntreeClassement[]>;
  recupererRangUtilisateur(utilisateurId: string): Promise<EntreeClassement | null>;
}

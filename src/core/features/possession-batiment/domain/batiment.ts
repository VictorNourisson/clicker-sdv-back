export interface BatimentProps {
  id: string;
  nom: string;
  description: string | null;
  coutBase: number;
  multiplicateurCps: number;
  ordreAffichage: number;
  icon: string | null;
}

export class Batiment {
  readonly id: string;
  readonly nom: string;
  readonly description: string | null;
  readonly coutBase: number;
  readonly multiplicateurCps: number;
  readonly ordreAffichage: number;
  readonly icon: string | null;

  constructor(props: BatimentProps) {
    this.id = props.id;
    this.nom = props.nom;
    this.description = props.description;
    this.coutBase = props.coutBase;
    this.multiplicateurCps = props.multiplicateurCps;
    this.ordreAffichage = props.ordreAffichage;
    this.icon = props.icon;
  }
}

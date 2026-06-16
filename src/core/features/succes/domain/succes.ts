export interface ProgressionSucces {
  supsTotal: bigint;
  supsPerSecond: bigint;
  supsPerClick: bigint;
  prestigeLevel: number;
  batimentsTotal: bigint;
}

export interface SuccesProps {
  id: string;
  nom: string;
  description: string | null;
  conditionType: string | null;
  conditionValeur: bigint | null;
  icone: string | null;
}

export class Succes {
  readonly id: string;
  readonly nom: string;
  readonly description: string | null;
  readonly conditionType: string | null;
  readonly conditionValeur: bigint | null;
  readonly icone: string | null;

  constructor(props: SuccesProps) {
    this.id = props.id;
    this.nom = props.nom;
    this.description = props.description;
    this.conditionType = props.conditionType;
    this.conditionValeur = props.conditionValeur;
    this.icone = props.icone;
  }

  estDebloquePar(progression: ProgressionSucces): boolean {
    if (this.conditionType === null || this.conditionValeur === null) {
      return false;
    }

    switch (this.conditionType) {
      case "sups_total":
        return progression.supsTotal >= this.conditionValeur;
      case "sups_per_second":
        return progression.supsPerSecond >= this.conditionValeur;
      case "sups_per_click":
        return progression.supsPerClick >= this.conditionValeur;
      case "prestige_level":
        return BigInt(progression.prestigeLevel) >= this.conditionValeur;
      case "batiments_total":
        return progression.batimentsTotal >= this.conditionValeur;
      default:
        return false;
    }
  }
}

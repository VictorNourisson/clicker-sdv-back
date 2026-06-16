import {
  ConditionType,
  isConditionTypeBatimentQuantite,
  extractBatimentIdFromCondition,
} from "./condition-type";

export interface ProgressionSucces {
  supsTotal: bigint;
  supsPerSecond: bigint;
  supsPerClick: bigint;
  prestigeLevel: number;
  batimentsTotal: bigint;
  quantitesParBatiment: Map<string, bigint>;
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

    // Vérifier si c'est une condition de quantité de bâtiment spécifique
    if (isConditionTypeBatimentQuantite(this.conditionType)) {
      const batimentId = extractBatimentIdFromCondition(this.conditionType);
      const quantite =
        progression.quantitesParBatiment.get(batimentId) ?? BigInt(0);
      return quantite >= this.conditionValeur;
    }

    switch (this.conditionType) {
      case ConditionType.SUPS_TOTAL:
        return progression.supsTotal >= this.conditionValeur;
      case ConditionType.SUPS_PER_SECOND:
        return progression.supsPerSecond >= this.conditionValeur;
      case ConditionType.SUPS_PER_CLICK:
        return progression.supsPerClick >= this.conditionValeur;
      case ConditionType.PRESTIGE_LEVEL:
        return BigInt(progression.prestigeLevel) >= this.conditionValeur;
      case ConditionType.BATIMENTS_TOTAL:
        return progression.batimentsTotal >= this.conditionValeur;
      default:
        return false;
    }
  }
}

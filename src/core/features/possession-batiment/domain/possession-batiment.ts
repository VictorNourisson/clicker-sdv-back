export interface PossessionBatimentProps {
  id: string;
  sessionId: string;
  batimentId: string;
  quantite: number;
  cookiesProduitsTotal: bigint;
  premierAchat: Date | null;
}

export class PossessionBatiment {
  readonly id: string;
  readonly sessionId: string;
  readonly batimentId: string;
  readonly quantite: number;
  readonly cookiesProduitsTotal: bigint;
  readonly premierAchat: Date | null;

  constructor(props: PossessionBatimentProps) {
    this.id = props.id;
    this.sessionId = props.sessionId;
    this.batimentId = props.batimentId;
    this.quantite = props.quantite;
    this.cookiesProduitsTotal = props.cookiesProduitsTotal;
    this.premierAchat = props.premierAchat;
  }

  acheter(quantiteAchetee: number): PossessionBatiment {
    return new PossessionBatiment({
      ...this.toProps(),
      quantite: this.quantite + quantiteAchetee,
      premierAchat: this.premierAchat ?? new Date(),
    });
  }

  private toProps(): PossessionBatimentProps {
    return {
      id: this.id,
      sessionId: this.sessionId,
      batimentId: this.batimentId,
      quantite: this.quantite,
      cookiesProduitsTotal: this.cookiesProduitsTotal,
      premierAchat: this.premierAchat,
    };
  }
}

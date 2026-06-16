export interface PossessionBatimentProps {
  id: string;
  sessionId: string;
  batimentId: string;
  quantite: number;
  supsProduitsTotal: bigint;
  premierAchat: Date | null;
}

export class PossessionBatiment {
  readonly id: string;
  readonly sessionId: string;
  readonly batimentId: string;
  readonly quantite: number;
  readonly supsProduitsTotal: bigint;
  readonly premierAchat: Date | null;

  constructor(props: PossessionBatimentProps) {
    this.id = props.id;
    this.sessionId = props.sessionId;
    this.batimentId = props.batimentId;
    this.quantite = props.quantite;
    this.supsProduitsTotal = props.supsProduitsTotal;
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
      supsProduitsTotal: this.supsProduitsTotal,
      premierAchat: this.premierAchat,
    };
  }
}

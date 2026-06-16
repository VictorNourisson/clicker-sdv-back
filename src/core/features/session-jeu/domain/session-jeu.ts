export interface SessionJeuProps {
  id: string;
  utilisateurId: string;
  supsTotal: bigint;
  supsPerSecond: bigint;
  supsPerClick: bigint;
  supsMonney: number;
  prestigeLevel: number;
  derniereSauvegarde: Date;
  createdAt: Date;
}

export class SessionJeu {
  readonly id: string;
  readonly utilisateurId: string;
  readonly supsTotal: bigint;
  readonly supsPerSecond: bigint;
  readonly supsPerClick: bigint;
  readonly supsMonney: number;
  readonly prestigeLevel: number;
  readonly derniereSauvegarde: Date;
  readonly createdAt: Date;

  constructor(props: SessionJeuProps) {
    this.id = props.id;
    this.utilisateurId = props.utilisateurId;
    this.supsTotal = props.supsTotal;
    this.supsPerSecond = props.supsPerSecond;
    this.supsPerClick = props.supsPerClick;
    this.supsMonney = props.supsMonney;
    this.prestigeLevel = props.prestigeLevel;
    this.derniereSauvegarde = props.derniereSauvegarde;
    this.createdAt = props.createdAt;
  }

  appliquerPrestige(): SessionJeu {
    return new SessionJeu({
      ...this.toProps(),
      supsTotal: 0n,
      supsPerSecond: 0n,
      supsPerClick: 1n,
      prestigeLevel: this.prestigeLevel + 1,
      derniereSauvegarde: new Date(),
    });
  }

  sauvegarder(supsTotal: bigint, supsPerSecond: bigint, supsPerClick: bigint, supsMonney: number): SessionJeu {
    return new SessionJeu({
      ...this.toProps(),
      supsTotal,
      supsPerSecond,
      supsPerClick,
      supsMonney,
      derniereSauvegarde: new Date(),
    });
  }

  private toProps(): SessionJeuProps {
    return {
      id: this.id,
      utilisateurId: this.utilisateurId,
      supsTotal: this.supsTotal,
      supsPerSecond: this.supsPerSecond,
      supsPerClick: this.supsPerClick,
      supsMonney: this.supsMonney,
      prestigeLevel: this.prestigeLevel,
      derniereSauvegarde: this.derniereSauvegarde,
      createdAt: this.createdAt,
    };
  }
}

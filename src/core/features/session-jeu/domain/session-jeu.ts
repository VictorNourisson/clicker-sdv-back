export interface SessionJeuProps {
  id: string;
  utilisateurId: string;
  cookiesTotal: bigint;
  cookiesPerSecond: bigint;
  cookiesPerClick: bigint;
  prestigeLevel: number;
  derniereSauvegarde: Date;
  createdAt: Date;
}

export class SessionJeu {
  readonly id: string;
  readonly utilisateurId: string;
  readonly cookiesTotal: bigint;
  readonly cookiesPerSecond: bigint;
  readonly cookiesPerClick: bigint;
  readonly prestigeLevel: number;
  readonly derniereSauvegarde: Date;
  readonly createdAt: Date;

  constructor(props: SessionJeuProps) {
    this.id = props.id;
    this.utilisateurId = props.utilisateurId;
    this.cookiesTotal = props.cookiesTotal;
    this.cookiesPerSecond = props.cookiesPerSecond;
    this.cookiesPerClick = props.cookiesPerClick;
    this.prestigeLevel = props.prestigeLevel;
    this.derniereSauvegarde = props.derniereSauvegarde;
    this.createdAt = props.createdAt;
  }

  appliquerPrestige(): SessionJeu {
    return new SessionJeu({
      ...this.toProps(),
      cookiesTotal: 0n,
      cookiesPerSecond: 0n,
      cookiesPerClick: 1n,
      prestigeLevel: this.prestigeLevel + 1,
      derniereSauvegarde: new Date(),
    });
  }

  sauvegarder(cookiesTotal: bigint, cookiesPerSecond: bigint, cookiesPerClick: bigint): SessionJeu {
    return new SessionJeu({
      ...this.toProps(),
      cookiesTotal,
      cookiesPerSecond,
      cookiesPerClick,
      derniereSauvegarde: new Date(),
    });
  }

  private toProps(): SessionJeuProps {
    return {
      id: this.id,
      utilisateurId: this.utilisateurId,
      cookiesTotal: this.cookiesTotal,
      cookiesPerSecond: this.cookiesPerSecond,
      cookiesPerClick: this.cookiesPerClick,
      prestigeLevel: this.prestigeLevel,
      derniereSauvegarde: this.derniereSauvegarde,
      createdAt: this.createdAt,
    };
  }
}

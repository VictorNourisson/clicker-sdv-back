export interface UtilisateurProps {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  lastLogin: Date | null;
  isActive: boolean;
}

export class Utilisateur {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly createdAt: Date;
  readonly lastLogin: Date | null;
  readonly isActive: boolean;

  constructor(props: UtilisateurProps) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
    this.createdAt = props.createdAt;
    this.lastLogin = props.lastLogin;
    this.isActive = props.isActive;
  }
}

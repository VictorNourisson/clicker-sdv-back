export interface SuccesObtenuProps {
  id: string;
  sessionId: string;
  succesId: string;
  obtenuLe: Date;
}

export class SuccesObtenu {
  readonly id: string;
  readonly sessionId: string;
  readonly succesId: string;
  readonly obtenuLe: Date;

  constructor(props: SuccesObtenuProps) {
    this.id = props.id;
    this.sessionId = props.sessionId;
    this.succesId = props.succesId;
    this.obtenuLe = props.obtenuLe;
  }
}

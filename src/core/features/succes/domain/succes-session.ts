import { Succes } from "./succes";

export interface SuccesSessionProps {
  succes: Succes;
  obtenuLe: Date | null;
}

export class SuccesSession {
  readonly succes: Succes;
  readonly obtenuLe: Date | null;

  constructor(props: SuccesSessionProps) {
    this.succes = props.succes;
    this.obtenuLe = props.obtenuLe;
  }

  get obtenu(): boolean {
    return this.obtenuLe !== null;
  }
}

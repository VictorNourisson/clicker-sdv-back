export interface TokenService {
  generer(payload: { userId: string; username: string }): string;
}

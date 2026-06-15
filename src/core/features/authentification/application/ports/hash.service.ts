export interface HashService {
  hacher(plaintext: string): Promise<string>;
  comparer(plaintext: string, hash: string): Promise<boolean>;
}

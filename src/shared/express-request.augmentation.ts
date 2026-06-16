declare global {
  namespace Express {
    interface Request {
      utilisateurId?: string;
      username?: string;
    }
  }
}

export {};

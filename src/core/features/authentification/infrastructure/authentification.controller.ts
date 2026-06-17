import { Request, Response } from "express";
import { InscrireUtilisateur } from "../application/inscrire-utilisateur";
import { ConnecterUtilisateur } from "../application/connecter-utilisateur";

export class AuthentificationController {
  constructor(
    private readonly inscrireUtilisateur: InscrireUtilisateur,
    private readonly connecterUtilisateur: ConnecterUtilisateur
  ) {}

  async inscrire(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body as {
      username: string;
      email: string;
      password: string;
    };

    await this.inscrireUtilisateur.executer({ username, email, password });

    res.status(201).json({ message: "Compte créé avec succès." });
  }

  async connecter(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as { email: string; password: string };

    const resultat = await this.connecterUtilisateur.executer({ email, password });

    res.cookie("token", resultat.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ userId: resultat.userId, username: resultat.username });
  }

  deconnecter(_req: Request, res: Response): void {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Déconnecté." });
  }
}

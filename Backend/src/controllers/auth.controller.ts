import { Request, Response } from "express";
import { IAuthOperations } from "../services/auth";

export class AuthController {
  private authService: IAuthOperations;
  constructor(authService: IAuthOperations) {
    this.authService = authService;
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as { email: string; password: string };
      const token = await this.authService.generateJWT(data.email, data.password);
      res.status(200).send(token);
    } catch (error: any) {
      console.error(error);
      res.status(500).send({ msg: `Error during login: ${error.message}` });
    }
  }
}

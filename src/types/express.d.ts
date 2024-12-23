// Extiende la interfaz Request de Express
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userInfo?: {
        userId: number;
        role: number;
      };
    }
  }
}

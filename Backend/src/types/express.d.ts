/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";
declare module "express" {
  export interface Request {
    userInfo?: {
      userId: number;
      role: number;
    };
  }
}

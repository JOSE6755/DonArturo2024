import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export function validateToken(req: Request, res: Response, next: NextFunction) {
  let token: string | undefined = req.header("Authorization");
  if (!token) {
    res.status(400).json({ msg: "token is required" });
    return;
  }
  token = token.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY || "secreto") as {
      userId: number;
      role: number;
    };
    req.userInfo = payload;

    next();
  } catch (error: any) {
    console.error(error);
    res.status(401).json({ msg: `Error validating token: ${error.message}` });
  }
}

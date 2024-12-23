import { NextFunction, Request, Response } from "express";
const roles: number[] = [1, 2];
export function isOperador(req: Request, res: Response, next: NextFunction) {
  if (!req.userInfo) {
    res.status(500).json({ msg: `Error validating role` });
    return;
  }
  const { role } = req.userInfo;

  if (!roles.includes(role)) {
    res.status(401).json({ msg: `invalid role ${role}` });
    return;
  }
  next();
}

export function hasRole(roles: number[]): (req: Request, res: Response, next: NextFunction) => void {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.userInfo) {
      res.status(500).json({ msg: `Error validating role` });
      return;
    }
    if (!roles.includes(req.userInfo.role)) {
      res.status(401).json({ msg: `Invalid role` });
      return;
    }
    next();
  };
}

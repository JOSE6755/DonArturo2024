import { Result, ValidationError, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
export function validateAllParams(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const errors: Result<ValidationError> = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    try {
      if (req.file?.path) {
        fs.promises.unlink(req.file.path);
        res.status(400).json(errors);
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.status(500).json({
        msg: `Deleting file ${req.file?.path} failed: ${error.message}`,
      });
    }
  }
  next();
}

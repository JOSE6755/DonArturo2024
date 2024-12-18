import { Result, ValidationError, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
export async function validateAllParams(req: Request, res: Response, next: NextFunction): Promise<void> {
  const errors: Result<ValidationError> = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    try {
      if (req.file?.path) {
        await fs.promises.unlink(req.file.path);
      }
      res.status(400).json(errors);
      return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.status(500).json({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        msg: `Deleting file ${req.file?.path} failed: ${error.message}`,
      });
      return;
    }
  }
  next();
}

import { NextFunction, Request, Response } from "express";
import fs from "fs";
export function parseBodyToJson(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    if (!req.body.productInfo) {
      res
        .status(400)
        .json({ msg: "Missing productInfo param in multipart/form-data" });
      return;
    }
    const body = JSON.parse(req.body.productInfo);
    req.body.productInfo = body;
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (req.file) {
      fs.promises.unlink(req.file.path);
    }
    res
      .status(500)
      .json({ msg: "Error parsing body to JSON: " + error.message });
    return;
  }
}

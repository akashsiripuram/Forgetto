import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const header = req.headers["authorization"];
  const decoded = jwt.verify(header as string, "secretKey");
  if (decoded) {
    if (typeof decoded === "string") {
      return res.status(403).json({
        message: "You are not logged in",
      });
    }
    //@ts-ignore
    req.userId = (decoded as JwtPayload).id;
    next();
  } else {
    return res.status(403).json({
      message: "You are not logged in",
    });
  }
}

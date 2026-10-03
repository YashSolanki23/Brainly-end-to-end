import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_password } from "./config";

export const middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: "You are not logged in"
    });
  }

  const parts = header.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(403).json({
      message: "Invalid Authorization Token"
    });
  }

  const token=parts[1];

  try {
     //@ts-ignore
    const decoded = jwt.verify(token, JWT_password);

    if (typeof decoded === "string") {
      return res.status(403).json({
        message: "Invalid Token"
      });
    }
   //@ts-ignore
    req.userId = (decoded as JwtPayload).id;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "You are not logged in"
    });
  }};
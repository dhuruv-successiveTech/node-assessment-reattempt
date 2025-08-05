import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class AuthMid {
  private static instance: AuthMid;
  public static getInstance(): AuthMid {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public authMiddleware = (
    req: Request & { user?: string | jwt.JwtPayload },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        return res.status(404).json({
          success: false,
          message: "Token not found",
        });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY!);
      req.user = decoded;
      return next();
    } catch (error) {
      throw error;
    }
  };
}

export default AuthMid.getInstance()
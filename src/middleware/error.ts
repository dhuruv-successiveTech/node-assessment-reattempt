import { NextFunction, Request, Response } from "express";

class ApiError {
  private static instance: ApiError;
  public static getInstance(): ApiError {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  
  public error = (
    err: Error & { statusCode: number },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const errCode = err.statusCode || 500;
    return res.status(errCode).json({
      success: false,
      message: err.message,
    });
  };
}

export default ApiError.getInstance();

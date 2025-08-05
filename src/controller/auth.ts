import { Request, Response } from "express";
import { User } from "../models/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Auth {
  private static instance: Auth;
  public static getInstance(): Auth {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist) {
      return res.status(409).json({
        success: false,
        message: "user already exists",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const registerUser = await User.create({
      password: hashPass,
      email,
      name,
    });

    return res.status(201).json({
      message: "USer registered successfully",
      success: true,
    });
  };
  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const isExist = await User.findOne({ email });

    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, isExist.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password not match",
      });
    }

    const token = jwt.sign(
      { id: isExist._id, email: isExist.email },
      process.env.SECRET_KEY!,
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      success: true,
      message: "User Logged in successfully",
      token: token,
    });
  };
}

export default Auth.getInstance()

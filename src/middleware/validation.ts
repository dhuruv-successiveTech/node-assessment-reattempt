import { NextFunction, Request, Response } from "express";
import Joi from "joi";

class Validation {
  private static instance: Validation;
  public static getInstance(): Validation {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public validation = (schema:Joi.ObjectSchema) => {
    return (req:Request,res:Response,next:NextFunction)=>{
        const {error} = schema.validate(req.body);
        if(error){
            throw error;
        }
        else{
            next()
        }
    }
  };
  
}

export default Validation.getInstance()
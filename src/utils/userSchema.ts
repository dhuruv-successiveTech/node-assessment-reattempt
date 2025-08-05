
import Joi from "joi";

class StudentSchema {
  private static instance: StudentSchema;
  public static getInstance(): StudentSchema {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public joiStudent = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
    grade: Joi.string().required(),
    createdAt: Joi.date(),
  });
}

export default StudentSchema.getInstance();

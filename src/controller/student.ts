import { Request, Response } from "express";
import { Student } from "../models/student";

class StudentData {
  private static instance: StudentData;
  public static getInstance(): StudentData {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
  public getStudent = async (req: Request, res: Response) => {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    const skip = (page - 1) * limit;
    const students = await Student.find({})
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      message: "student Data",
      students: students,
    });
  };

  public addStudent = async (req: Request, res: Response) => {
    const postStudent = new Student(req.body);
    const student = await postStudent.save();
    return res.status(201).json({
      message: "Student added successfully",
      student: student,
    });
  };

  public getStudentById = async (req: Request, res: Response) => {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    return res.status(200).json({
      message: "Student data",
      student: student,
    });
  };

  public updateStudent = async (req: Request, res: Response) => {
    const id = req.params.id;
    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: "Student updated successfully",
      student: student,
    });
  };

  public deleteStudent = async (req: Request, res: Response) => {
    const id = req.params.id;
    const student = await Student.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Student deleted successfully",
      student: student,
    });
  };

  public getStudentByAge = async (req: Request, res: Response) => {
    const minAge = Number(req.query.minAge);
    const maxAge = Number(req.query.maxAge);

    const student = await Student.find({ age: { $gt: minAge, $lt: maxAge } });
    return res.status(200).json({
      message: "Student in range of age",
      student: student,
    });
  };

  public aggregate = async (req: Request, res: Response) => {
    const ageStats = await Student.aggregate([
      {
        $group: {
          _id: "$age",
          count:{$sum:1},
          averageAge: { $avg: "$age" },
        },
      },
    ]);
  };
}

export default StudentData.getInstance();

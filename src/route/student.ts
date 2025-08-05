import express from "express";
import student from "../controller/student";
import auth from "../middleware/auth";
import studentSchema from "../utils/userSchema";
import validation from "../middleware/validation";

const studentRoute = express.Router();
studentRoute.get("/", auth.authMiddleware, student.getStudent);
studentRoute.post(
  "/",
  validation.validation(studentSchema.joiStudent),
  auth.authMiddleware,
  student.addStudent
);
studentRoute.get("/:id", auth.authMiddleware, student.getStudentById);
studentRoute.put("/:id", auth.authMiddleware, student.updateStudent);
studentRoute.delete("/:id", auth.authMiddleware, student.deleteStudent);
studentRoute.get("/", auth.authMiddleware, student.getStudentByAge);
studentRoute.get("/aggregate",auth.authMiddleware, student.getStudentByAge)

export default studentRoute;

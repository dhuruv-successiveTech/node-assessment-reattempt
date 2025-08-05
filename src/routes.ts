import express from "express";
import authRoute from "./route/auth";
import studentRoute from "./route/student";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/student", studentRoute);


export default router;

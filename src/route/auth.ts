import express from "express";
import auth from "../controller/auth";

const authRoute = express.Router();

authRoute.post("/login",auth.login)
authRoute.post("/register",auth.register)


export default authRoute;
import express from "express";
import dotenv from "dotenv";
import database from "./lib/database";
import router from "./routes";
import ApiError from "./middleware/error"
import createError from "http-errors"

const app = express();

dotenv.config();
database.dbConnect();

app.use(express.json());
app.use("/api",router)

app.use((req,res,next)=>{
  next(createError(404,"Route not found"))
})


app.use(ApiError.error)

app.listen(process.env.PORT, () => {
  console.log(`server started at http://localhost:${process.env.PORT}`);
});

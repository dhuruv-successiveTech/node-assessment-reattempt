import express from "express";
import dotenv from "dotenv";
import database from "./lib/database";
import router from "./routes";
const app = express();
dotenv.config();
database.dbConnect();
app.use(express.json());
app.use("/api", router);
app.listen(process.env.PORT, () => {
    console.log(`server started at http://localhost:${process.env.PORT}`);
});

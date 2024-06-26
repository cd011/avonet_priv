import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import ExpenceLimitRouter from "./routes/expence-limits";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string =
  "mongodb+srv://cgeass908:9svY0Z7BveDm8YRB@cluster0.qkqlsml.mongodb.net/";

mongoose
  .connect(mongoURI)
  .then(() => console.log("connected to database"))
  .catch((err) => console.error("database connection failed:", err));

app.use("/financial-records", financialRecordRouter);
app.use("/expence-limits", ExpenceLimitRouter);

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});

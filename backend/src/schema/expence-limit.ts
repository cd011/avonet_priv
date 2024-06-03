import mongoose from "mongoose";

interface ExpenceLimit {
  userId: string;
  amount: number;
  date: Date;
}

const ExpenceLimitSchema = new mongoose.Schema<ExpenceLimit>({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

const ExpenceLimitModel = mongoose.model<ExpenceLimit>(
  "ExpenceLimit",
  ExpenceLimitSchema
);

export default ExpenceLimitModel;

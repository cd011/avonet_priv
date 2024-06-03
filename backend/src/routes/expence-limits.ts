import express, { Request, Response } from "express";
import ExpenceLimitModel from "../schema/expence-limit";

const router = express.Router();

router.get(
  "/getExpenceByUserID/:userId",
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const record = await ExpenceLimitModel.find({ userId: userId });
      if (record.length === 0) {
        return res.status(404).send("no records");
      }
      res.status(200).send(record);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new ExpenceLimitModel(newRecordBody);
    const savedRecord = await newRecord.save();

    res.status(200).send(savedRecord);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await ExpenceLimitModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );

    if (!record) return res.status(404).send();

    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const record = await ExpenceLimitModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;

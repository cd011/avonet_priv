import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useExpenceLimit } from "../../contexts/expence-limit-context";

export const ExpenceLimit = () => {
  const [date, setDate] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const { addRecord } = useExpenceLimit();

  const { user } = useUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const stdDate = new Date(date);

    const newRecord = {
      userId: user?.id ?? "",
      date: stdDate,

      amount: parseFloat(amount),
    };

    addRecord(newRecord);

    setDate("");
    setAmount("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Amount:</label>
          <input
            type="number"
            required
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Date:</label>
          <input
            type="date"
            required
            className="input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="button">
          Add Record
        </button>
      </form>
    </div>
  );
};

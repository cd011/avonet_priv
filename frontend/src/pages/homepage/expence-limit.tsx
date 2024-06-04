import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useExpenceLimit } from "../../contexts/expence-limit-context";

export const ExpenceLimit = () => {
  const [amount, setAmount] = useState<string>("");

  const { addRecord } = useExpenceLimit();

  const { user } = useUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),

      amount: parseFloat(amount),
    };

    addRecord(newRecord);

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

        <button type="submit" className="button">
          Add Record
        </button>
      </form>
    </div>
  );
};

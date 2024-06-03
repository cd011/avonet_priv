import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export interface ExpenceLimit {
  _id?: string;
  userId: string;
  amount: number;
  date: Date;
}

interface ExpenceLimitContextType {
  records: ExpenceLimit[];
  addRecord: (record: ExpenceLimit) => void;
  updateRecord: (id: string, newRecord: ExpenceLimit) => void;
  deleteRecord: (id: string) => void;
}

export const ExpenceLimitContext = createContext<
  ExpenceLimitContextType | undefined
>(undefined);

export const ExpenceLimitProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<ExpenceLimit[]>([]);
  const { user } = useUser();

  const fetchRecords = async () => {
    if (!user) return;
    const response = await fetch(
      `http://localhost:3001/expence-limits/getExpenceByUserID/${user.id}`
    );

    if (response.ok) {
      const records = await response.json();
      console.log(records);
      setRecords(records);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const addRecord = async (record: ExpenceLimit) => {
    const response = await fetch("http://localhost:3001/expence-limits", {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (err) {
      console.log("add record error");
    }
  };

  const updateRecord = async (id: string, newRecord: ExpenceLimit) => {
    const response = await fetch(`http://localhost:3001/expence-limits/${id}`, {
      method: "PUT",
      body: JSON.stringify(newRecord),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => {
            if (record._id === id) {
              return newRecord;
            } else {
              return record;
            }
          })
        );
      }
    } catch (err) {
      console.log("edit record error");
    }
  };

  const deleteRecord = async (id: string) => {
    const response = await fetch(`http://localhost:3001/expence-limits/${id}`, {
      method: "DELETE",
    });

    try {
      if (response.ok) {
        const deletedRecord = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deletedRecord._id)
        );
      }
    } catch (err) {
      console.log("delete record error");
    }
  };

  return (
    <ExpenceLimitContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </ExpenceLimitContext.Provider>
  );
};

export const useExpenceLimit = () => {
  const context = useContext<ExpenceLimitContextType | undefined>(
    ExpenceLimitContext
  );

  if (!context) {
    throw new Error("only inside ExpenceLimitProvider");
  }

  return context;
};

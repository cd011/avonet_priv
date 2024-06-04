import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import "./financial-record.css";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";
import { ExpenceLimit } from "./expence-limit";
import { PieChart } from "../dashboard/expensePie";
import { useExpenceLimit } from "../../contexts/expence-limit-context";

export const Homepage = () => {
  const { user } = useUser();
  const { records } = useFinancialRecords();
  const { records: expenceLimit } = useExpenceLimit();

  const totalMonthly = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    let totalAmount = 0;
    records.forEach((record) => {
      const recordDate = new Date(record.date);
      if (
        recordDate.getMonth() === currentMonth &&
        recordDate.getFullYear() === currentYear
      ) {
        totalAmount += record.amount;
      }
    });
    return totalAmount;
  }, [records]);

  const monthlyLimit = expenceLimit.length > 0 ? expenceLimit[0].amount : 0;
  const alertThreshold = monthlyLimit * 0.9;
  const showAlert = totalMonthly > alertThreshold;

  return (
    <div className="homepage-container">
      <h1>{user?.firstName}'s Personal Expense Tracking App</h1>
      <div className="expenses-info">
        <div className="current-expenses">
          Current monthly expenses: LKR {totalMonthly}
        </div>
        {expenceLimit.length > 0 && (
          <div className="monthly-limit">Monthly Limit: LKR {monthlyLimit}</div>
        )}
        {showAlert && (
          <div className="alert">
            Warning: You have exceeded 90% of your monthly limit!
          </div>
        )}
      </div>
      <br></br>
      <PieChart expanceData={records} />
      <br></br>
      <h2>Your expenses table:</h2>
      <FinancialRecordList />
      <br></br>
      <h2>Add an expense:</h2>
      <FinancialRecordForm />
      <br></br>
      <h2>Add your monthly expense limit:</h2>
      <ExpenceLimit />
    </div>
  );
};

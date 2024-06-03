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
  console.log(expenceLimit);
  const totalMonthly = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      totalAmount += record.amount;
    });

    return totalAmount;
  }, [records]);

  return (
    <div className="homepage-container">
      <h1> Welcome {user?.firstName}! Here Are Your Finances:</h1>
      <div>Total Monthly: Rs.{totalMonthly}</div>
      {expenceLimit.length > 0 && (
        <div>Monthly Limit: Rs.{expenceLimit[0].amount}</div>
      )}
      <PieChart expanceData={records} />
      <FinancialRecordList />
      <FinancialRecordForm />
      <ExpenceLimit />
    </div>
  );
};

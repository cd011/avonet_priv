import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Expense {
  type: string;
  amount: number;
  [key: string]: any;
}

interface PieChartProps {
  expanceData: Expense[];
}

const groupBy = (items: Expense[], key: string): { [key: string]: Expense[] } =>
  items.reduce((result: { [key: string]: Expense[] }, item: Expense) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});

export function PieChart({ expanceData }: PieChartProps) {
  const [chartData, setChartData] = useState<any>({});

  useEffect(() => {
    let groupBydata = groupBy(expanceData, "type");
    console.log(groupBydata);
    const data = Object.values(groupBydata).map((value) =>
      value.reduce((n, { amount }) => n + amount, 0)
    );
    let pieChartData = {
      labels: Object.keys(groupBydata),
      datasets: [
        {
          label: "LKR",
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    console.log(pieChartData);
    setChartData(pieChartData);
  }, [expanceData]);

  console.log(expanceData);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ textAlign: "center", width: "35%" }}>
        {chartData?.labels?.length && <Pie data={chartData} />}
      </div>
    </div>
  );
}

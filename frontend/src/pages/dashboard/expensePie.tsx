import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { pieChart } from "../homepage/pieChart";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
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

const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );

export function PieChart({ expanceData }) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    let groupBydata = groupBy(expanceData, "type");
    console.log(groupBydata);
    console.log(
      Object.values(groupBydata).map((value) =>
        value.reduce((n, { amount }) => n + amount, 0)
      )
    );
    let pieChartData = {
      labels: Object.keys(groupBydata),
      datasets: [
        {
          label: "# of Votes",

          data: Object.values(groupBydata).map((value) =>
            value.reduce((n, { amount }) => n + amount, 0)
          ),
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
      <div style={{ textAlign: "center", width: "25%" }}>
        {chartData?.labels?.length && <Pie data={chartData} />}
      </div>
    </div>
  );
}

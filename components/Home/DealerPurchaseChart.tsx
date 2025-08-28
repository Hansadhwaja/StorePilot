"use client";

import { getDealerPurchasesByDate } from "@/lib/actions/dashboardActions";
import { DealerPurchaseSummary } from "@/types";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DealerPurchaseChartProps {
  month: string;
}

const DealerPurchaseChart = ({ month }: DealerPurchaseChartProps) => {
  const [dataSummary, setDataSummary] = useState<DealerPurchaseSummary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDealerPurchasesByDate(month);
      setDataSummary(res);
    };
    fetchData();
  }, [month]);

  const data = {
    labels: dataSummary.map((d) => d.date.split("-").slice(1).join("-")),
    datasets: [
      {
        label: "Purchases",
        data: dataSummary.map((d) => d.totalPurchases),
        backgroundColor: "rgb(34,197,94)",
      },
      {
        label: "Paid",
        data: dataSummary.map((d) => d.totalPaid),
        backgroundColor: "rgb(59,130,246)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Daily Purchases vs Paid" },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 30,
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-64 md:h-80 lg:h-96 p-4 rounded-xl shadow">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DealerPurchaseChart;

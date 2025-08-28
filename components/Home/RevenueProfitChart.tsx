"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getSalesSummaryByDate } from "@/lib/actions/saleActions";
import { DailySale } from "@/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface RevenueProfitChartProps {
  month: string;
}

const RevenueProfitChart = ({ month }: RevenueProfitChartProps) => {
  const [dailySales, setDailySales] = useState<DailySale[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSalesSummaryByDate(month);
      setDailySales(data);
    };
    fetchData();
  }, [month]);

  const labels = dailySales.map((s) => s.date.split("-").slice(1).join("-"));
  const revenueData = dailySales.map((s) => s.totalRevenue);
  const profitData = dailySales.map((s) => s.totalProfit);

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenueData,
        borderColor: "rgb(34,197,94)",
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.4,
      },
      {
        label: "Profit",
        data: profitData,
        borderColor: "rgb(59,130,246)",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Daily Revenue & Profit" },
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
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueProfitChart;

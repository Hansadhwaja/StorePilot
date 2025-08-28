"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SummaryType } from "@/types";
import { ArrowUp, ArrowDown } from "lucide-react";

const SummaryCards = ({ summary }: { summary: SummaryType }) => {
  const data = [
    {
      title: "Revenue",
      value: summary.revenue.value,
      change: summary.revenue.change,
      color: "text-green-600",
    },
    {
      title: "Profit",
      value: summary.profit.value,
      change: summary.profit.change,
      color: "text-blue-600",
    },
    {
      title: "Purchases",
      value: summary.purchases.value,
      change: summary.purchases.change,
      color: "text-purple-600",
    },
    {
      title: "Payments",
      value: summary.paid.value,
      change: summary.paid.change,
      color: "text-yellow-600",
    },
    {
      title: "Due",
      value: summary.due.value,
      change: summary.due.change,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid gap-2 sm:gap-3 grid-cols-2 lg:grid-cols-3">
      {data.map((d) => (
        <Card key={d.title} className="rounded-xl shadow-sm">
          <CardContent className="flex flex-col sm:flex-row gap-1 sm:gap-2 items-start sm:items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-xs font-medium text-gray-500">
                {d.title}
              </span>
              <span className={`text-sm sm:text-lg font-semibold ${d.color}`}>
                {d.value.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center text-[8px] sm:text-xs font-medium mt-1 sm:mt-0">
              {d.change >= 0 ? (
                <ArrowUp className={`w-3 h-3 ${d.color} mr-1`} />
              ) : (
                <ArrowDown className={`w-3 h-3 ${d.color} mr-1`} />
              )}
              {Math.abs(d.change).toFixed(2)}%
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;

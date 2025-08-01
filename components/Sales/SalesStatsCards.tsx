import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShoppingCart, IndianRupee, TrendingUp } from "lucide-react";

interface Props {
  totalItems: number;
  totalRevenue: number;
  totalProfit: number;
}

export default function SalesStatsCards({ totalItems, totalRevenue, totalProfit }: Props) {
  const cards = [
    {
      label: "Total Items Sold",
      value: totalItems,
      color: "blue",
      icon: <ShoppingCart className="w-6 h-6 text-blue-600" />,
      textColor: "text-blue-700",
    },
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toFixed(2)}`,
      color: "green",
      icon: <IndianRupee className="w-6 h-6 text-green-600" />,
      textColor: "text-green-700",
    },
    {
      label: "Total Profit",
      value: `₹${totalProfit.toFixed(2)}`,
      color: totalProfit > 0 ? "emerald" : totalProfit < 0 ? "red" : "gray",
      icon:
        totalProfit > 0 ? (
          <TrendingUp className="w-6 h-6 text-emerald-600" />
        ) : (
          <TrendingUp className="w-6 h-6 text-gray-500" />
        ),
      textColor:
        totalProfit > 0
          ? "text-emerald-700"
          : totalProfit < 0
          ? "text-red-700"
          : "text-gray-700",
      subtext:
        totalProfit > 0
          ? "Profit generated"
          : totalProfit < 0
          ? "Loss incurred"
          : "Break-even",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {cards.map((card) => (
        <Card
          key={card.label}
          className={cn(
            "border",
            `border-${card.color}-100`,
            "shadow-md hover:shadow-lg transition duration-200 ease-in-out"
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={cn("text-lg font-medium", `text-${card.color}-600`)}>
              {card.label}
            </CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <p className={cn("text-3xl font-bold tracking-tight", card.textColor)}>
              {card.value}
            </p>
            {card.subtext && (
              <p className="text-sm text-muted-foreground mt-1">{card.subtext}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DealerProps } from "@/types";
import { cn } from "@/lib/utils";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  IndianRupee,
  Wallet,
  HandCoins,
} from "lucide-react";

export function DealerStatsCards(dealer: DealerProps ) {
  const { totalPurchased, totalPaid,due } = dealer;

  const cards = [
    {
      label: "Total Purchased",
      value: totalPurchased,
      color: "blue",
      icon: <IndianRupee className="w-6 h-6 text-blue-600" />,
      textColor: "text-blue-700",
    },
    {
      label: "Total Paid",
      value: totalPaid,
      color: "green",
      icon: <ArrowUpCircle className="w-6 h-6 text-green-600" />,
      textColor: "text-green-700",
    },
    {
      label:
        due > 0
          ? "Due Amount"
          : due < 0
          ? "Advance Paid"
          : "Settled",
      value: Math.abs(due),
      color:
        due > 0
          ? "red"
          : due < 0
          ? "green"
          : "gray",
      icon:
        due > 0 ? (
          <ArrowDownCircle className="w-6 h-6 text-red-600" />
        ) : due < 0 ? (
          <HandCoins className="w-6 h-6 text-green-600" />
        ) : (
          <Wallet className="w-6 h-6 text-gray-600" />
        ),
      textColor:
        due > 0
          ? "text-red-700"
          : due < 0
          ? "text-green-700"
          : "text-gray-700",
      subtext:
        due > 0
          ? "Pending payment"
          : due < 0
          ? "Advance in account"
          : "Fully Settled",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <CardTitle
              className={cn("text-lg font-medium", `text-${card.color}-600`)}
            >
              {card.label}
            </CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <p
              className={cn(
                "text-3xl font-bold tracking-tight",
                card.textColor
              )}
            >
              ₹{card.value}
            </p>
            {card.subtext && (
              <p className="text-sm text-muted-foreground mt-1">
                {card.subtext}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

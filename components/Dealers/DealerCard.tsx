import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DealerProps } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import BadgeStatus from "../BadgeStatus";
import AddPayment from "../Payment/AddPayment";

const DealerCard = (dealer: DealerProps) => {
  const {
    _id,
    name,
    email,
    phone,
    address,
    totalPurchased,
    totalPaid,
    due,
    status,
  } = dealer;
  return (
    <Card
      key={_id}
      className="shadow-md hover:shadow-lg transition-all rounded-2xl border border-muted bg-white"
    >
      <CardHeader className="pb-2 border-b">
        <div className="flex flex-col items-start justify-between">
          <div className="flex gap-4">
            <CardTitle className="text-xl font-semibold text-gray-800">
              {name}
            </CardTitle>
            <Link
              href={`/dealers/${_id}`}
              className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
            >
              View Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">{address || "N/A"}</p>
        </div>

        <BadgeStatus status={status} />
      </CardHeader>

      <CardContent className="pt-4 space-y-4 text-sm text-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground">📞 Phone</p>
            <p>{phone || "-"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">✉️ Email</p>
            <p>{email || "-"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground">Total Purchased</p>
            <p className="font-medium">₹{totalPurchased}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Paid</p>
            <p className="font-medium">₹{totalPaid}</p>
          </div>
          <div>
            <p className="text-muted-foreground">
              {due < 0 ? "Credit Balance" : "Due"}
            </p>
            <p
              className={cn(
                "font-semibold",
                due < 0
                  ? "text-green-600"
                  : due > 0
                  ? "text-red-600"
                  : "text-gray-600"
              )}
            >
              ₹{Math.abs(due)}
            </p>
          </div>
        </div>

        <div className="flex gap-1 sm:gap-2 justify-between pt-2">
          <AddPayment dealerId={_id.toString()} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DealerCard;

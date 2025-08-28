import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DealerProps } from "@/types";
import { ArrowRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import BadgeStatus from "../BadgeStatus";
import AddPayment from "../Payment/AddPayment";
import { Button } from "../ui/button";

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
      className="shadow-sm hover:shadow-lg transition-all rounded-2xl border border-muted bg-card"
    >
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            <p className="text-sm text-muted-foreground truncate max-w-[180px]">
              {address || "No address provided"}
            </p>
          </div>
          <Link
            href={`/dealers/${_id}`}
            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            View <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="mt-2">
          <BadgeStatus status={status} />
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-5 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span className="truncate">{phone || "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="truncate">{email || "-"}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Total Purchased</p>
            <p className="font-medium">₹{totalPurchased}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Paid</p>
            <p className="font-medium">₹{totalPaid}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {due < 0 ? "Credit Balance" : "Due"}
            </p>
            <p
              className={cn(
                "font-semibold",
                due < 0
                  ? "text-green-600"
                  : due > 0
                  ? "text-red-600"
                  : "text-gray-500"
              )}
            >
              ₹{Math.abs(due)}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-2 flex-wrap">
          <div className="flex-1 min-w-[120px]">
            <AddPayment dealerId={_id.toString()} />
          </div>
          <div className="flex-1 min-w-[120px]">
            <Link href={`/dealers/${_id}/purchases/new`}>
              <Button
                variant={"secondary"}
                className="text-xs md:text-sm w-full"
              >
                + Add Purchase
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealerCard;

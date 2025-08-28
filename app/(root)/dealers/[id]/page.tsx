import { DealerStatCards } from "@/components/Dealers/DealerStatCards";
import DealerPaymentList from "@/components/Payment/DealerPaymentList";
import DealerPurchaseList from "@/components/Purchase/DealerPurchaseList";
import { getDealerById } from "@/lib/actions/dealerActions";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function DealerDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dealer = await getDealerById(id);

  return (
    <div className="space-y-10">
      <DealerStatCards
        totalPurchased={dealer.totalPurchased}
        totalPaid={dealer.totalPaid}
        due={dealer.due}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">
            Purchases
          </h2>
          <div className="flex gap-3">
            <Link
              href={`/dealers/${dealer._id.toString()}/purchases`}
              className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
            >
              View More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <DealerPurchaseList dealerId={dealer._id.toString()} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">
            Payments
          </h2>
          <div className="flex gap-3">
            <Link
              href={`/dealers/${dealer._id.toString()}/payments`}
              className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
            >
              View More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <DealerPaymentList dealerId={dealer._id.toString()} />
        </div>
      </section>
    </div>
  );
}

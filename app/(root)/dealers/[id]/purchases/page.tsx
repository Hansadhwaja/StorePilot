import PurchaseTable from "@/components/Purchase/PurchaseTable";
import { Button } from "@/components/ui/button";
import { getPurchasesByDealer } from "@/lib/actions/purchaseActions";

import Link from "next/link";

export default async function DealerPurchasesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const purchases = await getPurchasesByDealer(id);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-semibold tracking-tight flex items-center gap-2">
          Purchases
        </h2>

        <div className="flex gap-3">
          <Link href={`/dealers/${id}/purchases/new`}>
            <Button>+ Add Purchase</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <PurchaseTable purchases={purchases} />
      </div>
    </section>
  );
}

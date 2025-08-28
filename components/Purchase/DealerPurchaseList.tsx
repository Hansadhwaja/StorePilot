import { getPurchasesByDealer } from "@/lib/actions/purchaseActions";
import React from "react";
import PurchaseTable from "./PurchaseTable";

const DealerPurchaseList = async ({ dealerId }: { dealerId: string }) => {
  const purchases = await getPurchasesByDealer(dealerId);
  return (
    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
      <PurchaseTable purchases={purchases} />
    </div>
  );
};

export default DealerPurchaseList;

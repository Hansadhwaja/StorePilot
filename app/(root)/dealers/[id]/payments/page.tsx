import AddPayment from "@/components/Payment/AddPayment";
import DealerPaymentList from "@/components/Payment/DealerPaymentList";
import { getDealerById } from "@/lib/actions/dealerActions";
import React from "react";

const PaymentPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const dealer = await getDealerById(id);
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-semibold tracking-tight flex items-center gap-2">
          Payments
        </h2>

        <div className="flex gap-3">
          <AddPayment dealerId={dealer._id.toString()} />
        </div>
      </div>

      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <DealerPaymentList dealerId={dealer._id.toString()} />
      </div>
    </section>
  );
};

export default PaymentPage;

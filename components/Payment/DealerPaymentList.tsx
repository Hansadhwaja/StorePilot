import { getPaymentsForDealer } from "@/lib/actions/paymentActions";
import PaymentTable from "./PaymentTable";
import AddPayment from "./AddPayment";

export default async function DealerPaymentList({
  dealerId,
}: {
  dealerId: string;
}) {
  const payments = await getPaymentsForDealer(dealerId);

  return (
    <section className="space-y-4">
      <div className="flex justify-between pt-2 gap-4">
        <h2 className="text-xl font-semibold">Payment History</h2>
        <AddPayment dealerId={dealerId} />
      </div>
      
      <PaymentTable payments={payments} />
    </section>
  );
}

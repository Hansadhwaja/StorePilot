import { getPaymentsForDealer } from "@/lib/actions/paymentActions";
import PaymentTable from "./PaymentTable";

export default async function DealerPaymentList({
  dealerId,
}: {
  dealerId: string;
}) {
  const payments = await getPaymentsForDealer(dealerId);

  return <PaymentTable payments={payments} dealerId={dealerId} />;
}

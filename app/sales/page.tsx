import { getSalesSummaryByDate } from "@/lib/actions/saleActions";
import AddSaleForm from "@/components/AddSaleForm";
import SummaryTable from "@/components/Sales/SummaryTable";

export default async function SalesPage() {
  const salesSummary = await getSalesSummaryByDate();

  const grandTotals = salesSummary.reduce(
    (acc, day) => {
      acc.totalItems += day.totalItems;
      acc.totalRevenue += day.totalRevenue;
      acc.totalProfit += day.totalProfit ?? 0;
      return acc;
    },
    { totalItems: 0, totalRevenue: 0, totalProfit: 0 }
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Sales by Day</h1>
        <AddSaleForm />
      </div>
      <SummaryTable salesSummary={salesSummary} grandTotals={grandTotals} />
    </div>
  );
}

import AddSaleForm from "@/components/Sales/AddSaleForm";
import { SalesHeader } from "@/components/Sales/SalesHeader";
import SummaryTable from "@/components/Sales/SummaryTable";
import { getSalesSummaryByDate } from "@/lib/actions/saleActions";

export default async function SalesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const current = new Date();
  const todayMonth = `${current.getFullYear()}-${String(
    current.getMonth() + 1
  ).padStart(2, "0")}`;

  const params = await searchParams;
  const month = typeof params.month === "string" ? params.month : todayMonth;

  const salesSummary = await getSalesSummaryByDate(month);

  return (
    <div className="space-y-6 min-h-screen">
      <div className="flex justify-between items-center sticky top-12 z-50 bg-background py-2 border-b">
        <SalesHeader selectedMonth={month} />
        <AddSaleForm />
      </div>
      <SummaryTable sales={salesSummary} />
    </div>
  );
}

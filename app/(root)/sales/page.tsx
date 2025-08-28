import { getSalesSummaryByDate } from "@/lib/actions/saleActions";
import SummaryTable from "@/components/Sales/SummaryTable";
import AddSaleForm from "@/components/Sales/AddSaleForm";
import { SalesHeader } from "@/components/Sales/SalesHeader";

export default async function SalesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const current = new Date();
  const month = (await searchParams).month;

  const selectedMonth =
    typeof month === "string" ? parseInt(month) : current.getMonth();

  const selectedYear = current.getFullYear();

  const formattedMonth = `${selectedYear}-${String(selectedMonth + 1).padStart(
    2,
    "0"
  )}`;

  const salesSummary = await getSalesSummaryByDate(formattedMonth);

  return (
    <div className="space-y-6 min-h-screen">
      <div className="flex justify-between items-center sticky top-12 z-50 bg-background py-2 border-b">
        <SalesHeader selectedMonth={selectedMonth} />
        <AddSaleForm />
      </div>
      <SummaryTable sales={salesSummary} />
    </div>
  );
}

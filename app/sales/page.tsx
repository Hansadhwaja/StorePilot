import { getSalesSummaryByDate } from "@/lib/actions/saleActions";
import SummaryTable from "@/components/Sales/SummaryTable";
import AddSaleForm from "@/components/Sales/AddSaleForm";
import { SalesHeader } from "@/components/Sales/SalesHeader";

interface SalesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SalesPage({ searchParams }: SalesPageProps) {
  const current = new Date();
  const params = await searchParams;
  const selectedMonth =
    typeof params.month === "string" ? parseInt(params.month) : current.getMonth();
  const selectedYear = current.getFullYear();

  const formattedMonth = `${selectedYear}-${String(selectedMonth + 1).padStart(
    2,
    "0"
  )}`;
  const salesSummary = await getSalesSummaryByDate(formattedMonth);

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <SalesHeader selectedMonth={selectedMonth} />
        <AddSaleForm />
      </div>
      <SummaryTable sales={salesSummary} />
    </div>
  );
}

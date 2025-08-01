import { SalesHeader } from "@/components/Sales/SalesHeader";
import SalesStatsCards from "@/components/Sales/SalesStatsCards";
import { getSalesSummaryByMonth } from "@/lib/actions/saleActions";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const currentDate = new Date();
  const month = (await searchParams).month;
  const selectedMonthIndex =
    typeof month === "string" ? parseInt(month) : currentDate.getMonth();

  const selectedMonthStr = `${currentDate.getFullYear()}-${String(
    selectedMonthIndex + 1
  ).padStart(2, "0")}`;

  const salesSummary = await getSalesSummaryByMonth(selectedMonthStr);
  const { totalProfit, totalRevenue, totalItems } = salesSummary;

  return (
    <div className="p-4 min-h-screen flex flex-col gap-4">
      <SalesHeader selectedMonth={selectedMonthIndex} />
      <SalesStatsCards
        totalItems={totalItems}
        totalRevenue={totalRevenue}
        totalProfit={totalProfit}
      />
    </div>
  );
}

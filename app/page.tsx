import { SalesHeader } from "@/components/Sales/SalesHeader";
import SalesStatsCards from "@/components/Sales/SalesStatsCards";
import { getSalesSummaryByMonth } from "@/lib/actions/saleActions";

interface HomePageProps {
  searchParams?: {
    month?: string;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const currentDate = new Date();
const selectedMonthIndex = searchParams?.month
  ? parseInt(searchParams.month)
  : currentDate.getMonth();

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

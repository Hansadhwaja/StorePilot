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
  const params=await searchParams;
  const selectedMonthIndex = params?.month
    ? parseInt(params.month)
    : currentDate.getMonth();

  const selectedMonthStr = `${currentDate.getFullYear()}-${String(
    selectedMonthIndex + 1
  ).padStart(2, "0")}`;

  const salesSummary = await getSalesSummaryByMonth(selectedMonthStr);
  const { totalProfit, totalRevenue, totalItems } = salesSummary;

  return (
    <div className="p-4 min-h-screen">
      <SalesHeader selectedMonth={selectedMonthIndex} />
      <SalesStatsCards
        totalItems={totalItems}
        totalRevenue={totalRevenue}
        totalProfit={totalProfit}
      />
    </div>
  );
}

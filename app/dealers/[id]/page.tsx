import BadgeStatus from "@/components/BadgeStatus";
import DealerAction from "@/components/Dealers/DealerAction";
import { DealerInfoCard } from "@/components/Dealers/DealerInfoCard";
import { DealerStatsCards } from "@/components/Dealers/DealerStatsCards";
import DealerPaymentList from "@/components/Payment/DealerPaymentList";
import { getDealerById } from "@/lib/actions/dealerActions";

export default async function DealerDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dealer = await getDealerById(id);
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4 items-start">
          <div>
            <h1 className="text-3xl font-bold">{dealer.name}</h1>
            <p className="text-muted-foreground">Dealer Dashboard</p>
          </div>
          <BadgeStatus status={dealer.status} />
        </div>
        <DealerAction {...dealer} />
      </div>

      <DealerInfoCard {...dealer} />
      <DealerStatsCards {...dealer} />
      
      {/* <PurchaseHistoryTable data={purchaseHistory} />
       */}
      <DealerPaymentList dealerId={dealer._id.toString()} />
    </div>
  );
}

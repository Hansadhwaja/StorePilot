import { getDealerById } from "@/lib/actions/dealerActions";
import PurchaseForm from "@/components/Purchase/PurchaseForm";

export default async function NewPurchasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dealer = await getDealerById(id);

  return (
    <div className="max-w-6xl mx-auto px-2 md:px-4 space-y-2 md:space-y-6">
      <h1 className="text-md md:text-xl lg:text-2xl font-bold text-center">
        Purchase Page
      </h1>

      <div className="p-2 md:p-4 border rounded-md">
        <p className="text-xs md:text-sm font-medium flex gap-2 items-center text-muted-foreground">
          Dealer:
          <span className="text-sm md:text-lg font-semibold text-foreground">
            {dealer.name}
          </span>
        </p>
      </div>
      <PurchaseForm dealerId={id} />
    </div>
  );
}

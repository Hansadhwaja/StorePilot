import { getDealers } from "@/lib/actions/dealerActions";
import DealerCard from "./DealerCard";

const AllDealers = async () => {
  const dealers = await getDealers();

  if (dealers.length === 0)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground text-lg">
          No dealers found. Try adding a dealer.
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 py-6">
      {dealers.map((dealer) => (
        <DealerCard key={dealer._id} {...dealer} />
      ))}
    </div>
  );
};

export default AllDealers;

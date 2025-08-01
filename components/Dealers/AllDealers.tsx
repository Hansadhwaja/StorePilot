import { getDealers } from "@/lib/actions/dealerActions";
import DealerCard from "./DealerCard";

const AllDealers = async () => {
  const dealers = await getDealers();
  if (dealers.length === 0)
    return (
      <p className="mt-12 flex justify-center">
        No Dealers found.Try adding Dealers.
      </p>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:p-6">
      {dealers.map((dealer) => (
        <DealerCard key={dealer._id} {...dealer} />
      ))}
    </div>
  );
};

export default AllDealers;

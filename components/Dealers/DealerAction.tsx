"use client";

import EditDealer from "./EditDealer";
import { DealerProps } from "@/types";
import { toast } from "sonner";
import { deleteDealer } from "@/lib/actions/dealerActions";
import { useRouter } from "next/navigation";
import DeleteAlert from "../DeleteAlert";

const DealerAction = (dealer: DealerProps) => {
  const { _id, name, email, phone, address, totalPurchased } = dealer;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteDealer(_id.toString());
      toast.success("Dealer deleted successfully");
      router.push("/dealers");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete dealer");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <EditDealer
        {...{
          id: _id.toString(),
          name,
          phone,
          email,
          address,
          openingBalance: totalPurchased,
        }}
      />
      <DeleteAlert
        onConfirm={handleDelete}
        title={`Delete ${name}?`}
        description={`This will permanently delete the dealer and all related records.`}
      />
    </div>
  );
};

export default DealerAction;

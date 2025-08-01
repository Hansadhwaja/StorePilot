import AllPurchasesForDealer from "./AllPurchasesForDealer";
import { getPurchasesByDealerId } from "@/lib/actions/purchase"; // or wherever your server function is

interface Props {
  params: { id: string };
}

const PurchaseList = async ({ params }: Props) => {
  const purchases = await getPurchasesByDealerId(params.id);

  return <AllPurchasesForDealer purchases={purchases} />;
};

export default PurchaseList;

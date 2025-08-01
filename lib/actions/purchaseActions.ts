"use server";

import mongoose from "mongoose";
import Purchase from "@/lib/models/Purchase";
import Dealer from "@/lib/models/Dealer";
import Payment from "@/lib/models/Payment";
import connectToDatabase from "../db";
import { revalidatePath } from "next/cache";
import { PurchaseFormValues } from "@/components/Purchases/PurchaseForm";
import { PopulatedItem, PopulatedPurchase } from "@/types";

export async function addPurchase({ data, dealerId }: { data: PurchaseFormValues, dealerId: string }) {
  await connectToDatabase();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items, totalAmount, paidAmount, fairCharge, purchaseDate } = data;

    if (!dealerId || !items.length) {
      throw new Error("Dealer and items are required.");
    }

    await Purchase.create([{
      dealerId,
      items,
      totalAmount,
      fairCharge,
      purchaseDate: new Date(purchaseDate),
    }], { session });

    const update: { $inc: Record<string, number> } = {
      $inc: { totalPurchased: totalAmount },
    };

    if (paidAmount > 0) {
      await Payment.create([{
        dealerId,
        amount: paidAmount,
        paidAt: new Date(purchaseDate),
        note: "Paid at time of purchase",
      }], { session });

      update.$inc.totalPaid = paidAmount;
    }

    await Dealer.findByIdAndUpdate(dealerId, update, { session });

    await session.commitTransaction();
    session.endSession();

    revalidatePath("/dealers");
    revalidatePath(`/dealers/${dealerId}`);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    const error = err instanceof Error ? err.message : "Unknown error";
    console.error("Purchase creation failed:", err);
    throw new Error("Failed to add purchase. " + error);
  }
}

export async function getPurchasesByDealer(dealerId: string): Promise<PopulatedPurchase[]> {
  await connectToDatabase();

  const purchases = await Purchase.find({ dealerId })
    .sort({ purchaseDate: -1 })
    .populate("dealerId", "name")
    .populate("items.productId", "name");

  return purchases.map((p) => ({
    _id: p._id.toString(),
    dealerId: {
      _id: p.dealerId._id.toString(),
      name: p.dealerId.name,
    },
    items: (p.items as PopulatedItem[]).map((item) => ({
      _id: item._id.toString(),
      productId: {
        _id: item.productId._id.toString(),
        name: item.productId.name,
      },
      quantity: item.quantity,
      rate: item.rate,
    })),
    totalAmount: p.totalAmount,
    fairAmount: p.fairAmount,
    purchaseDate: p.purchaseDate,
  }));
}

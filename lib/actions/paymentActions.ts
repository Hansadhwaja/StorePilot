'use server';

import { revalidatePath } from "next/cache"
import connectToDatabase from "../db"
import Payment from "../models/Payment"
import Dealer from "../models/Dealer"
import { Payment as PaymentProps } from "@/types";
import { Types } from "mongoose";

type RawPayment = {
  _id: Types.ObjectId;
  amount: number;
  paidAt: Date;
  note?: string;
  dealerId:string;
};


export async function addPayment(data: {
  dealerId: string
  amount: number
  paidAt: Date
  note?: string
}) {
  try {
    await connectToDatabase()

    const { dealerId, amount, paidAt, note } = data

    await Payment.create({
      dealerId,
      amount,
      paidAt,
      note,
    })

    await Dealer.findByIdAndUpdate(dealerId, {
      $inc: { totalPaid: amount },
    })

    revalidatePath("/dealers")
    revalidatePath(`/dealers/${dealerId}`)

    return { success: true }
  } catch (error) {
    console.error("Add payment error:", error)
    return { success: false, message: "Failed to add payment" }
  }
}

export async function getPaymentsForDealer(dealerId: string): Promise<PaymentProps[]> {
  try {
    await connectToDatabase();

    const rawPayments: RawPayment[] = await Payment.find({ dealerId })
      .sort({ paidAt: -1 });

    const payments: PaymentProps[] = rawPayments.map((p) => ({
      _id: p._id.toString(),
      amount: p.amount,
      paidAt: p.paidAt,
      note: p.note,
      dealerId:p.dealerId.toString()
    }));

    return payments;
  } catch (error) {
    console.error("Failed to fetch payments for dealer:", error);
    return [];
  }
}

export async function deletePayment(
  id: string
) {
  try {
    await connectToDatabase()


    const payment = await Payment.findByIdAndDelete(id);

    await Dealer.findByIdAndUpdate(payment.dealerId, {
      $inc: { totalPaid: -payment.amount },
    })

    revalidatePath("/dealers")
    revalidatePath(`/dealers/${payment.dealerId}`)

    return { success: true }
  } catch (error) {
    console.error("Delete payment error:", error)
    return { success: false, message: "Failed to delete payment" }
  }
}

export async function updatePayment(id: string, updatedData: { amount: number; note?: string }) {
  try {
    await connectToDatabase();

    const existing = await Payment.findById(id);
    if (!existing) {
      return { success: false, message: "Payment not found" };
    }

    const amountDiff = updatedData.amount - existing.amount;

    await Payment.findByIdAndUpdate(
      id,
      { $set: { amount: updatedData.amount, note: updatedData.note } },
      { new: true }
    );

    await Dealer.findByIdAndUpdate(existing.dealerId, {
      $inc: { totalPaid: amountDiff },
    });

    revalidatePath("/dealers");
    revalidatePath(`/dealers/${existing.dealerId}`);

    return { success: true };
  } catch (error) {
    console.error("Update payment error:", error);
    return { success: false, message: "Failed to update payment" };
  }
}
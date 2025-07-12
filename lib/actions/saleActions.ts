'use server';

import connectToDatabase from "@/lib/db";
import { Sale } from "../models/Sale";
import { revalidatePath } from "next/cache";

export async function addSale({
  productId,
  quantity,
  sellingPrice,
  costPrice,
  saleDate,
}: {
  productId: string;
  quantity: number;
  sellingPrice: number;
  costPrice?: number;
  saleDate?: string;
}) {
  await connectToDatabase();

  const profit = costPrice != null ? (sellingPrice - costPrice) * quantity : undefined;

  try {
    await Sale.create({
      product: productId,
      quantity,
      sellingPrice,
      costPrice,
      profit,
      saleDate: saleDate ? new Date(saleDate) : new Date(),
    });

    revalidatePath("/sales");
  } catch (err) {
    console.error("Failed to create sale:", err);
    throw new Error("Failed to add sale");
  }
}

export async function getSalesSummaryByDate() {
  await connectToDatabase();

  const sales = await Sale.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "productInfo",
      },
    },
    { $unwind: "$productInfo" },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$saleDate" } },
        },
        sales: {
          $push: {
            productName: "$productInfo.name",
            quantity: "$quantity",
            sellingPrice: "$sellingPrice",
            costPrice: "$costPrice",
            profit: "$profit",
          },
        },
        totalRevenue: { $sum: { $multiply: ["$quantity", "$sellingPrice"] } },
        totalProfit: { $sum: "$profit" },
        totalItems: { $sum: "$quantity" },
        saleCount: { $sum: 1 },
      },
    },
    { $sort: { "_id.date": 1 } },
  ]);

  return sales.map((s) => ({
    date: s._id.date,
    sales: s.sales,
    totalRevenue: s.totalRevenue,
    totalProfit: s.totalProfit,
    totalItems: s.totalItems,
    saleCount: s.saleCount,
  }));
}


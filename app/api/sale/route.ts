import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Sale } from "@/lib/models/Sale";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, quantity, sellingPrice, costPrice } = body;

    if (!productId || !quantity || !sellingPrice) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    const profit = costPrice != null ? (sellingPrice - costPrice) * quantity : undefined;

    const sale = await Sale.create({
      product: productId,
      quantity,
      sellingPrice,
      costPrice,
      profit,
    });

    return NextResponse.json({ message: "Sale added", sale });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add sale" }, { status: 500 });
  }
}

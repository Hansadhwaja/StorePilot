"use server";

import connectToDatabase from "@/lib/db";
import { revalidatePath } from "next/cache";
import Purchase from "../models/Purchase";
import { Product } from "../models/Product";
import { redirect } from "next/navigation";
import { PurchaseFormValues } from "@/schemas";

export async function createPurchase(
    dealerId: string,
    data: PurchaseFormValues
) {
    await connectToDatabase();

    try {
        const { date: purchaseDate, fairCharges: fairCharge = 0, items } = data;

        const itemDocs = [];
        let totalAmount = 0;

        for (const item of items) {
            let product = await Product.findOne({ name: item.productName });

            if (!product) {
                product = await Product.create({
                    name: item.productName,
                    category: item.category,
                    unit: item.unit,
                    sellingPrice: item.sellingPrice,
                    costPrice: item.costPrice,
                    stockQty: item.qty
                });
            }

            totalAmount += item.subtotal;

            itemDocs.push({
                productId: product._id,
                quantity: item.qty,
                pricePerUnit: item.costPrice,
            });
        }

        await Purchase.create({
            dealerId,
            items: itemDocs,
            totalAmount,
            purchaseDate,
            fairCharge,
            notes: "",
        });

    } catch (error) {
        console.log(error);
        throw new Error("Error creating purchase");
    }
    redirect(`/dealers/${dealerId}/purchases`);
}

export async function getPurchasesByDealer(dealerId: string) {
    await connectToDatabase();

    const purchases = await Purchase.find({ dealerId })
        .populate("items.productId", "name unit")
        .sort({ purchaseDate: -1 });

    return JSON.parse(JSON.stringify(purchases));
}

export async function deletePurchase(purchaseId: string, dealerId: string) {
    await connectToDatabase();
    await Purchase.findByIdAndDelete(purchaseId);

    revalidatePath(`/dealers/${dealerId}/purchases`);
}


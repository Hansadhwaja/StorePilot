'use server';

import { revalidatePath } from "next/cache";
import connectToDatabase from "../db";
import { Product } from "../models/Product";
import { Types } from "mongoose";

export interface ProductWithId {
    _id: string;
    name: string;
    category?: string;
    unit: string;
    sellingPrice: number;
    costPrice: number;
    stockQty?: number;
}

export async function addProduct(formData: FormData) {
    await connectToDatabase();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const unit = formData.get("unit") as string;
    const sellingPrice = Number(formData.get("sellingPrice"));
    const costPrice = Number(formData.get("costPrice"));
    const stockQty = Number(formData.get("stockQty"));

    if (!name || !unit || !sellingPrice || !costPrice) {
        throw new Error("Missing required fields");
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
        throw new Error(`Product "${name}" already exists`);
    }

    await Product.create({ name, category, unit, sellingPrice, costPrice, stockQty });

    revalidatePath("/products");
}

export async function updateProduct(id: string, formData: FormData) {
    await connectToDatabase();

    const updatedData = {
        name: formData.get("name") as string,
        category: formData.get("category") as string,
        unit: formData.get("unit") as string,
        sellingPrice: Number(formData.get("sellingPrice")),
        costPrice: Number(formData.get("costPrice")),
        stockQty: Number(formData.get("stockQty")),
    };

    await Product.findByIdAndUpdate(new Types.ObjectId(id), updatedData);

    revalidatePath("/products");
}

export async function getProducts(): Promise<ProductWithId[]> {
    await connectToDatabase();
    const products = await Product.find().lean<ProductWithId[]>();
    return products.map((p) => ({
        ...p,
        _id: p._id.toString(),
    }));
}

export async function deleteProduct(id: string) {
    await connectToDatabase();

    await Product.findByIdAndDelete(id);

    revalidatePath('/products');
}

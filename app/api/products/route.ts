
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Product } from "@/lib/models/Product";

export interface ProductData {
    _id: string;
    name: string;
    sellingPrice: number;
    costPrice: number;
    category: string;
}

export async function GET() {
    await connectToDatabase();
    const products = await Product.find().lean<ProductData[]>();
    return NextResponse.json(
        products.map((p) => ({
            _id: p._id.toString(),
            name: p.name,
            category:p.category,
            sellingPrice: p.sellingPrice,
            costPrice: p.costPrice,
        }))
    );
};




import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { ProductData } from "@/types";

export async function GET() {
    await connectToDatabase();
    const products = await Product.aggregate([
        { $sort: { category: 1, name: 1 } },
        {
            $group: {
                _id: "$category",
                products: {
                    $push: {
                        _id: "$_id",
                        name: "$name",
                        sellingPrice: "$sellingPrice",
                        costPrice: "$costPrice",
                    }
                }
            }
        }, {
            $sort: { _id: 1 }
        }
    ]);

    return NextResponse.json(
        products.map((group) => ({
            category: group._id,
            products: group.products.map((p: ProductData) => ({
                _id: p._id.toString(),
                name: p.name,
                sellingPrice: p.sellingPrice,
                costPrice: p.costPrice,
            })),
        }))
    );
};



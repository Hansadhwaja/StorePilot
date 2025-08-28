"use server";

import Dealer from "@/lib/models/Dealer";
import connectToDatabase from "../db";
import { revalidatePath } from "next/cache";
import { DealerFormData, DealerProps } from "@/types";

export async function addDealer(data: DealerFormData) {
    await connectToDatabase();

    try {
        const { name, phone, email, address, openingBalance } = data;

        if (!name) throw new Error("Dealer name is required");

        await Dealer.create({ name, phone, email, address, totalPurchased: openingBalance });
        revalidatePath("/dealers");
    } catch (error) {
        console.log(error);
        throw new Error("Error Adding Dealer");
    }
}

export async function getDealers(): Promise<DealerProps[]> {
    await connectToDatabase();

    try {
        const rawDealers = await Dealer.find();
        return rawDealers.map(doc => {
            const d = doc.toJSON({ virtuals: true });

            return { ...d, _id: d._id.toString() };
        });
    } catch (error) {
        console.log(error);
        throw new Error("Error Fetching Dealer");
    }
}

export async function getDealerById(id: string): Promise<DealerProps> {
    await connectToDatabase();

    try {
        const dealer = await Dealer.findById(id);

        return {
            ...dealer.toJSON({ virtuals: true }),
            _id: dealer._id.toString(),
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error Fetching Dealer");
    }
}

export async function deleteDealer(id: string) {
    await connectToDatabase();
    try {
        await Dealer.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error("Error Deleting Dealer");
    }
}

export async function updateDealer(id: string, data: DealerFormData) {
    await connectToDatabase();
    try {
        await Dealer.findByIdAndUpdate(id, data);
        revalidatePath(`/dealers/${id}`);
    } catch (error) {
        console.log(error);
        throw new Error("Error Updating Dealer");
    }
}

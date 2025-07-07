import { Schema, Document, model, models } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    category?: string;
    unit: string;
    sellingPrice: number;
    costPrice: number;
    stockQty?: number;
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true, unique: true },
    category: { type: String },
    unit: { type: String, required: true },
    sellingPrice: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    stockQty: { type: Number, default: 0 },
}, { versionKey: false, timestamps: true });

export const Product = models.Product || model<IProduct>('Product', ProductSchema);

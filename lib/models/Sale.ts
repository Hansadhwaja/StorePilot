import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ISale extends Document {
    product: mongoose.Types.ObjectId;
    quantity: number;
    sellingPrice: number;
    costPrice?: number;
    profit?: number;
    saleDate: Date;
}

const saleSchema = new Schema<ISale>({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    costPrice: {
        type: Number,
        required: false,
    },
    profit: {
        type: Number,
    },
    saleDate: {
        type: Date,
        default: Date.now,
    }
});

export const Sale = models.Sale || model<ISale>('Sale', saleSchema);




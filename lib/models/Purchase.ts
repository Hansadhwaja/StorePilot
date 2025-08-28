import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, min: 1 },
        pricePerUnit: { type: Number, min: 0 },
      },
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    purchaseDate: { type: Date, required: true },
    fairCharge: { type: Number, default: 0 },
    notes: { type: String }
  },
  { timestamps: true }
);

PurchaseSchema.index({ dealerId: 1 });
PurchaseSchema.index({ purchaseDate: -1 });

const Purchase = mongoose.models.Purchase || mongoose.model("Purchase", PurchaseSchema);
export default Purchase;
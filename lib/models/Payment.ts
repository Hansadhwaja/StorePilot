import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },
    paidAt: { type: Date, default: Date.now },
    amount: { type: Number, required: true, min: 0 },
    note: { type: String }
}, { timestamps: true });

const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
export default Payment;
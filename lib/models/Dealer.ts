import mongoose from "mongoose";

const DealerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String },
        email: { type: String },
        address: { type: String },
        totalPurchased: { type: Number, default: 0, min: 0 },
        totalPaid: { type: Number, default: 0, min: 0 },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

DealerSchema.virtual("due").get(function () {
    return this.totalPurchased - this.totalPaid;
})

DealerSchema.virtual("status").get(function () {
    const due = this.totalPurchased - this.totalPaid;
    if (due < 0) return "Advance";
    else if (due > 0) return "Due";
    else return "Settled";
})

if (process.env.NODE_ENV === "development") {
    delete mongoose.models.Dealer;
}

const Dealer = mongoose.models.Dealer || mongoose.model("Dealer", DealerSchema);
export default Dealer;
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const transactionSchema = new mongoose.Schema({
    user: {type : ObjectId, ref: "User" , required: true},
    type: {type: String, enum: ["DEPOSIT", "WITHDRAW"], required: true},
    amountCents: {type: Number, required: true},
    balanceAfterCents: {type: Number, required: true},
},
{timestamp: true});

export default mongoose.model("Transaction", transactionSchema);
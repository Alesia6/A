import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    cardNumber: { type: String, unique: true, required: true},
    pinHash: {type: String, required: true},
    balanceCents: { type: Number, default: 0},
},
{ timestamps: true});

export default mongoose.model("User" , userSchema);
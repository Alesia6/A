import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from  "./models/User.js";

async function run() {
    await mongoose.connect('mongodb://127.0.0.1:27017/atmdb');

    const cardNumber = "5555444433331111";
    const pin = "1234";
    const pinHash = await bcrypt.hash(pin, 10);

    await User.deleteMany({cardNumber});
    const user = await User.create({
        cardNumber,
        pinHash,
        balanceCents: 10000,
    });

  console.log("Our user:", { cardNumber, pin, balanceCents: user.balanceCents });
  process.exit(0);
}

run();
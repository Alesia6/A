import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";


const router = Router();

router.post('/login', async (req, res) => {
    const { cardNumber, pin} = req.body;
    if(!cardNumber || !pin) {
        return res.send("Card Number and Pin are required!!!");
    }

    const user = await User.findOne({cardNumber});
    if(!user)
     return res.send("Incorrect card number or pin");

    const ok = await bcrypt.compare(pin, user.pinHash);
    if(!ok) return res.send('Incorrect card number or pin');

    res.json({
        success: true,
        account: {
        userId: user._id.toString(),
        cardNumber: user.cardNumber,
        balanceCents: user.balanceCents,
        }
    });
});

export default router;
    
import { Router } from "express";
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
    res.send(`Your balance is ${user.balanceCents} cents`);
});

export default router;
    
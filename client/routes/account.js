import { Router } from "express";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

const router =Router();

function getUserId(req) {
    return req.body.userId;
}

router.get('/balance', async (req, res) => {
    const userId = getUserId(req);
    if(!userId) return res.send('userId is required!');

    const user = await User.findById(userId).select("cardNumber balanceCents");
    if(!user) return res.send('user not found');
     res.json({ cardNumber: user.cardNumber, balanceCents: user.balanceCents });

});

router.post('/deposit', async (req, res) =>{
    const {userId, amountCents} = req.body;
    const amount = Number(amountCents);
    if(!userId) return res.send('userId is required');
    if (!Number.isInteger(amount) || amount <=0) {
        return res.send("amountCents should be a positive number");
    }

    const user = await User.findByIdAndUpdate(
        userId,
        {$inc: {balanceCents: amount}},
        {new: true}    
    ).select('balanceCents');
    if(!user) return res.send("user not found");

    const tx = await Transaction.create({
        user: userId,
        type:"DEPOSIT",
        amountCents: amount,
        balanceAfterCents: user.balanceCents,
    });
      res.json({ balanceCents: user.balanceCents, transactionId: tx._id,
        createdAt: tx.createdAt
       });

});


router.post('/withdraw', async (req, res) => {
const {userId, amountCents} = req.body;
const amount = Number(amountCents);

if(!userId) return res.send('userId is required');
if (!Number.isInteger(amount) || amount<=0) {
 return res.send('amountCents must be positive number');
}

const user = await User.findOneAndUpdate(
    {_id: userId, balanceCents: {$gte: amount}},
    {$inc: {balanceCents: -amount}},
    {new: true}
    ).select("balanceCents");

if(!user) {
    return res.send('Insufficient funds')
}

const tx = await Transaction.create({
    user: userId,
    type: "WITHDRAW",
    amountCents: amount,
    balanceAfterCents: user.balanceCents,
})
 res.json({ balanceCents: user.balanceCents, transactionId: tx._id,
     createdAt: tx.createdAt
  });
});

router.get('/transactions', async (req, res) => {
    const userId = req.query.userId;
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    if (!userId) return res.send('userId is required');
    const txs = await Transaction.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit);
    res.json(txs);

});

export default router;
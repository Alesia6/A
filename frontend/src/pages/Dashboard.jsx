import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Dashboard() {
  const location = useLocation();
  const account = location.state?.account;

  const [balance, setBalance] = useState(account?.balanceCents || 0);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDeposit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/deposit", {
        userId: account.userId,       
        amountCents: parseInt(depositAmount) * 100, 
      });

      if (res.data.balanceCents !== undefined) {
        setBalance(res.data.balanceCents);   
        setMessage("Deposit successful!");
        setDepositAmount(""); // Clear input after success
      } else {
        setMessage("Deposit failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  const handleWithdraw = async () => {
    try {
      const amountNum = parseInt(withdrawAmount);
      if (isNaN(amountNum)) {
        setMessage("Please enter a valid amount");
        return;
      }

      const res = await axios.post("http://localhost:3000/api/withdraw", {
        userId: account.userId,       
        amountCents: amountNum * 100, 
      });

      if (res.data.balanceCents !== undefined) {
        setBalance(res.data.balanceCents);   
        setMessage("Withdrawal successful!");
        setWithdrawAmount(""); // Clear input after success
      } else {
        setMessage("Withdrawal failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  if (!account) {
    return <p>Please log in first!</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, card number: {account.cardNumber}</p>
      <p>Balance: ${balance / 100}</p>

      <h3>Deposit Money</h3>
      <input
        type="number"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleDeposit}>Deposit</button>

      <hr />

      <h3>Withdraw Money</h3>
      <input
        type="number"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleWithdraw}>Withdraw</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Dashboard;
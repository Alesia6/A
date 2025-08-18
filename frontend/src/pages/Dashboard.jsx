import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const location = useLocation();
  const account = location.state?.account;

  const [balanceDollars, setBalanceDollars] = useState(
    account ? account.balanceCents / 100 : 0
  );
  
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
  if (account) {
    axios.get("http://localhost:3000/api/transactions", {
      params: { userId: account.userId }
    })
    .then(res => setTransactions(res.data))
    .catch(() => setMessage("Can't load transactions!"));
  }
}, [account]);

  const showMoney = (dollars) => `$${dollars.toFixed(2)}`;

  const fetchTransactions = () => {
  axios.get("http://localhost:3000/api/transactions", {
    params: { userId: account.userId }
  })
  .then(res => setTransactions(res.data))
  .catch(() => setMessage("Could not refresh transactions"));
};

  const handleDeposit = async () => {
    if (isProcessing) return;
    
    try {
      const dollarsToAdd = Number(depositAmount);
      
      if (isNaN(dollarsToAdd)) {
        setMessage("Please enter a number");
        return;
      }
      if (dollarsToAdd <= 0) {
        setMessage("Amount must be positive");
        return;
      }

      setIsProcessing(true);
      setMessage("Adding amount...");

      const centsToAdd = Math.round(dollarsToAdd * 100);
      
      const res = await axios.post("http://localhost:3000/api/deposit", {
        userId: account.userId,
        amountCents: centsToAdd,
      });

      const newBalanceDollars = res.data.balanceCents / 100;
      setBalanceDollars(newBalanceDollars);
      
      setMessage(`Deposit: ${showMoney(dollarsToAdd)}! New balance: ${showMoney(newBalanceDollars)}`);
      setDepositAmount("");
    } catch (err) {
      setMessage("Failed to add amount");
    } finally {
      fetchTransactions();
      setIsProcessing(false);
    }
  };

  const handleWithdraw = async () => {
    if (isProcessing) return;
    
    try {
      const dollarsToRemove = Number(withdrawAmount);
      
      if (isNaN(dollarsToRemove)) {
        setMessage("Please enter a number");
        return;
      }
      if (dollarsToRemove <= 0) {
        setMessage("Amount must be positive");
        return;
      }
      if (dollarsToRemove > balanceDollars) {
        setMessage(`You only have ${showMoney(balanceDollars)}!`);
        return;
      }

      setIsProcessing(true);
      setMessage("Withdrawing...");

      const centsToRemove = Math.round(dollarsToRemove * 100);
      
      const res = await axios.post("http://localhost:3000/api/withdraw", {
        userId: account.userId,
        amountCents: centsToRemove,
      });

      const newBalanceDollars = res.data.balanceCents / 100;
      setBalanceDollars(newBalanceDollars);
      
      setMessage(`Withdrawal: ${showMoney(dollarsToRemove)}! New balance: ${showMoney(newBalanceDollars)}`);
      setWithdrawAmount("");
    } catch (err) {
      setMessage("Failed to withdraw money");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!account) {
    return (
      <div>
        <h2>Please log in</h2>
        <p>You need to log in to see your money</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Bank Account</h2>
      
      <div>
        <p>Card: {account.cardNumber}</p>
        <p>Balance: {showMoney(balanceDollars)}</p>
      </div>

      <div>
        <h3>Deposit</h3>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          placeholder="0.00"
          disabled={isProcessing}/>

        <button 
          onClick={handleDeposit}
          disabled={!depositAmount || isProcessing}>
          {isProcessing ? "Depositing" : "Deposit"}
        </button>
      </div>

      <div>
        <h3>Withdraw</h3>
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder="0.00"
          disabled={isProcessing}/>

        <button 
          onClick={handleWithdraw}
          disabled={!withdrawAmount || isProcessing} >

          {isProcessing ? "Withdrawing..." : "Withdraw"}
        </button>
      </div>

      {message && <p>{message}</p>}

      <div>
        <h3>Last Transactions</h3>
        <ul>
          {transactions.map(tx => (
            <li key={tx._id}>
              {tx.type === "DEPOSIT" ? "+" : "-" }
              {showMoney(tx.amountCents / 100)} -
            {new Date(tx.createdAt).toLocaleDateString()} {new Date(tx.createdAt).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
import { useLocation } from "react-router-dom";

function Dashboard()  {
    
        const location = useLocation();
        const account = location.state?.account;

    return (
        <div>
            <h2>Dashboard</h2>
            {account ? (
                <div>
                    <p>Welcome {account.cardNumber}</p>
                    <p>Balance: ${account.balance}</p>
                </div>
            ) : (
                <p>Please log in first!</p>
            )}
           
        </div>
    );
}

export default Dashboard;
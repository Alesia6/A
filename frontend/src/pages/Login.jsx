import { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";



function Login(){
    const [cardNumber, setCardNumber] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] =useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/api/login", {
                cardNumber, 
                pin,
            });

            if(res.data.success) {
                navigate("/dashboard", {state: {account: res.data.account}});
            }else {
                setError("Incorrect card number or pin");

            }
 } catch (err) {
     console.error(err);
     setError("Something wrnt wrong!");
 }
    };
    return(

        <div>
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cardNumber">Card Number</label>
                    <input type="text" 
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="pin">Pin:</label>
                    <input type="password" 
                    id="pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                     />
                </div>
                <button type="submit">Login</button>
            </form>
                  {error && <p style={{ color: "red" }}>{error}</p>}

        </div>
    )
}

export default Login;
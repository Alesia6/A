import { Routes, Route, Link} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (

      <div>
       <h1>ATM</h1>
       <nav>
       <Link to="/login">Login</Link> | <Link to="/dashboard">Dashboard</Link>
       </nav>
       <Routes>
        <Route path="/login" element={<Login /> }/>
 <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </div>
    
  )
}

export default App;

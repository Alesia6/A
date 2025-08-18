import { Routes, Route, Link, useLocation} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
 const location = useLocation();
 const hideNavbar = location.pathname === '/login';


  return (

      <div>
        {!hideNavbar && (
<>
      
       <h1>ATM APP</h1>
       <nav>
       <Link to="/login">Login</Link> | <Link to="/dashboard">Dashboard</Link>
       </nav>
       </>
        )}
       <Routes>
        <Route path="/login" element={<Login /> }/>
 <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </div>
    
  )
}

export default App;

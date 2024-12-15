// import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transaction from "./pages/Trasactions/Transctions";
import Accounts from "./pages/Accounts/Accounts";
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />

          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path='/accounts' element={<Accounts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

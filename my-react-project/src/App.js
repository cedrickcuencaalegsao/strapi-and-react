// import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from './pages/Auth/AuthPage';
import Dashboard from "./pages/Dashboard/Dashboard";
import Transaction from "./pages/Trasactions/Transctions";
import Accounts from "./pages/Accounts/Accounts";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<AuthPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path='/accounts' element={<Accounts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

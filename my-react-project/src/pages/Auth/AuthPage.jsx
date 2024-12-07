import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AuthPage() {
  const [showRegister, setShowRegister] = useState(true);
  // Login.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    navigate("/dashboard");
  };

  const handleShowRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {showRegister ? (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Login
          </h1>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={(e) => handleLogin(e)}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
          <p
            onClick={handleShowRegister}
            className="text-center text-blue-500 mt-4 cursor-pointer hover:underline"
          >
            Register new account
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Register
          </h1>
          <input
            type="text"
            placeholder="First name"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last name"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
            Register
          </button>
          <p
            onClick={handleShowRegister}
            className="text-center text-blue-500 mt-4 cursor-pointer hover:underline"
          >
            Cancel
          </p>
        </div>
      )}
    </div>
  );
}

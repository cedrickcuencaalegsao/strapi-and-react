import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../Hooks/useLogin";

export const Login = () => {
  const { loginUser } = useLogin();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [response, setResponse] = useState("");

  const navigator = (params) => {
    navigate(params);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginForm = {
      identifier,
      password,
    };
    const response = await loginUser(loginForm);

    if (response?.status === 200) {
      sessionStorage.setItem("token", response?.response);
      sessionStorage.setItem("email", identifier);
      sessionStorage.setItem("uuid", response?.uuid);
      console.log(response);
      navigate("/dashboard");
    } else {
      setResponse(response?.response);
      setTimeout(() => {
        setResponse("");
      }, 3000);
    }
  };
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) navigate("/dashboard");
  });
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <span style={{ fontSize: "13px", color: "red", fontWeight: "600" }}>
        {response}
      </span>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <form onSubmit={(e) => handleLogin(e)}>
          <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Login
          </h1>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
        <p
          onClick={() => navigator("/register")}
          className="text-center text-blue-500 mt-4 cursor-pointer hover:underline"
        >
          Register new account
        </p>
      </div>
    </div>
  );
};

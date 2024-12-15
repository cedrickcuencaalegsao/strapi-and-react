import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../Hooks/useRegister";

export const Register = () => {
  const { signupUser } = useRegister();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const navigator = (params) => {
    navigate(params);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      const username = `${fname} ${lname}`;
      const data = {
        username,
        email,
        password,
      };
      console.log(data);
      const response = await signupUser(data); // Use signupUser here

      if (response?.status === 200) {
        sessionStorage.setItem("token", response?.response);
        navigate("/dashboard");
      } else {
        setResponse(response?.response);
        setTimeout(() => {
          setResponse("");
        }, 3000);
      }
    } else {
      setResponse("Password did not match.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <form onSubmit={(e) => handleRegister(e)}>
          <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Register
          </h1>
          <span style={{ fontSize: "13px", color: "red" }}>{response}</span>
          <input
            onChange={(e) => setFname(e.target.value)}
            type="text"
            placeholder="First name"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={(e) => setLname(e.target.value)}
            type="text"
            placeholder="Last name"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Register
          </button>
        </form>
        <p
          onClick={() => navigator("/")}
          className="text-center text-blue-500 mt-4 cursor-pointer hover:underline"
        >
          Cancel
        </p>
      </div>
    </div>
  );
};

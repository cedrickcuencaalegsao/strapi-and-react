import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaRegCreditCard,
  FaRegHandshake,
  FaSignOutAlt,
} from "react-icons/fa"; // Importing the icons

export default function SideBar() {
  const navigator = useNavigate();

  const navigate = (args) => {
    navigator(args);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-gray-800 p-4 shadow-lg h-full w-64">
      <div className="text-white text-xl font-bold mb-8">My Bank</div>
      <div className="flex flex-col space-y-4">
        <p
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-gray-300 hover:text-white cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition duration-300"
        >
          <FaHome className="mr-3 text-gray-300 hover:text-white transition duration-300" />{" "}
          Home
        </p>
        <p
          onClick={() => navigate("/accounts")}
          className="flex items-center text-gray-300 hover:text-white cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition duration-300"
        >
          <FaRegCreditCard className="mr-3 text-gray-300 hover:text-white transition duration-300" />{" "}
          Accounts
        </p>
        <p
          onClick={() => navigate("/transaction")}
          className="flex items-center text-gray-300 hover:text-white cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition duration-300"
        >
          <FaRegHandshake className="mr-3 text-gray-300 hover:text-white transition duration-300" />{" "}
          Transaction
        </p>
        <p
          onClick={logout}
          className="flex items-center text-gray-300 hover:text-white cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition duration-300"
        >
          <FaSignOutAlt className="mr-3 text-gray-300 hover:text-white transition duration-300" />{" "}
          Logout
        </p>
      </div>
    </div>
  );
}

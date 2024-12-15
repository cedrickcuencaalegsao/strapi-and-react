import { useEffect, useState } from "react";
import AppLayout from "../../Layout/app";
import { useNavigate } from "react-router-dom";
import { useGetAccount } from "../../Hooks/useGetAccount";
import RegisterAccountModal from "../../Components/Modal/RegisterAccountModal";
import Withdraw from "../../Components/Modal/withdraw";
import Deposit from "../../Components/Modal/deposit";
import Transfer from "../../Components/Modal/transfer";

export default function Accounts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawOpen, setWithdrawOpem] = useState(false);
  const [isDepositOpen, setDepositOpen] = useState(false);
  const [isTrasferOpen, setTransferOpen] = useState(false);
  // Example data for bank accounts
  const navigate = useNavigate();
  const { getAccounts } = useGetAccount();
  const [accounts, setAccounts] = useState([]);

  const get_account = async () => {
    const data = await getAccounts();
    console.log(data);
    setAccounts(data);
  };

  const closeRegister = () => setIsModalOpen(false);
  const openWithdraw = () => setWithdrawOpem(true);
  const closeWithdraw = () => setWithdrawOpem(false);
  const openDeposit = () => setDepositOpen(true);
  const closeDeposit = () => setDepositOpen(false);
  const openTransfer = () => setTransferOpen(true);
  const closeTrasfer = () => setTransferOpen(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token || token === null) navigate("/");
    get_account();
  }, []);

  return (
    <AppLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts?.map((account, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {account.account_type}
            </h2>
            <p className="text-gray-600 mt-2">
              Account Number: {account.account_number}
            </p>
            <div className="mt-4">
              <p className="text-xl font-bold text-gray-900">
                $ {account.amount.toFixed(2)}
              </p>
            </div>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
                onClick={openWithdraw}
              >
                Withdraw
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
                onClick={openDeposit}
              >
                Deposit
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
                onClick={openTransfer}
              >
                Transfer
              </button>
            </div>
          </div>
        ))}
        {isModalOpen && <RegisterAccountModal closeModal={closeRegister} />}
        {isWithdrawOpen && <Withdraw closeModal={closeWithdraw} />}
        {isDepositOpen && <Deposit closeModal={closeDeposit} />}
        {isTrasferOpen && <Transfer closeModal={closeTrasfer} />}
      </div>
    </AppLayout>
  );
}

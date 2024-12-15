// src/pages/Accounts/Accounts.jsx
import { useEffect, useState } from "react";
import AppLayout from "../../Layout/app";
import { useNavigate } from "react-router-dom";
import { useGetAccount } from "../../Hooks/useGetAccount";
import { useGetTransaction } from "../../Hooks/useGetTransaction";
import RegisterAccountModal from "../../Components/Modal/RegisterAccountModal";
import Withdraw from "../../Components/Modal/withdraw";
import Deposit from "../../Components/Modal/deposit";

export default function Accounts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawOpen, setWithdrawOpen] = useState(false);
  const [isDepositOpen, setDepositOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const navigate = useNavigate();
  const { getAccounts } = useGetAccount();
  const { getTransactions } = useGetTransaction();
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateAccountBalance = (accountNumber) => {
    return transactions.reduce((balance, transaction) => {
      if (transaction.account_number === accountNumber) {
        if (transaction.type === "deposit") {
          return balance + Number(transaction.amount);
        } else if (transaction.type === "withdraw") {
          return balance - Number(transaction.amount);
        }
      }
      return balance;
    }, 0);
  };

  const get_account = async () => {
    try {
      setIsLoading(true);
      const [accountsData, transactionsData] = await Promise.all([
        getAccounts(),
        getTransactions(),
      ]);
      console.log("Accounts data:", accountsData);
      console.log("Transactions data:", transactionsData);
      setAccounts(accountsData);
      setTransactions(transactionsData);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const closeRegister = () => {
    setIsModalOpen(false);
    get_account();
  };

  const openWithdraw = (account) => {
    setSelectedAccount(account);
    setWithdrawOpen(true);
  };

  const closeWithdraw = () => {
    setWithdrawOpen(false);
    setSelectedAccount(null);
    get_account();
  };

  const openDeposit = (account) => {
    setSelectedAccount(account);
    setDepositOpen(true);
  };

  const closeDeposit = () => {
    setDepositOpen(false);
    setSelectedAccount(null);
    get_account();
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token || token === null) {
      navigate("/");
      return;
    }
    get_account();
  }, [navigate]);

  return (
    <AppLayout>
      {/* Accounts Grid */}
      {isLoading ? (
        <div className="text-center py-4">Loading accounts...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 capitalize">
                  {account.account_type}
                </h2>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  ID: {account.id}
                </span>
              </div>

              {/* Amount Display - Now calculated from transactions */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600 mb-1">Current Balance</p>
                <p className="text-3xl font-bold text-gray-900">
                  $ {calculateAccountBalance(account.account_number).toFixed(2)}
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-gray-600">
                  <span className="font-semibold">Account Number:</span>
                  <br />
                  {account.account_number}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span>
                  <br />
                  {account.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Document ID:</span>
                  <br />
                  {account.documentId}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Created:</span>
                  <br />
                  {new Date(account.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="border-t pt-4">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="flex space-x-4">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
                    onClick={() => openWithdraw(account)}
                  >
                    Withdraw
                  </button>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
                    onClick={() => openDeposit(account)}
                  >
                    Deposit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Account Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      {/* Modals */}
      {isModalOpen && <RegisterAccountModal closeModal={closeRegister} />}
      {isWithdrawOpen && (
        <Withdraw closeModal={closeWithdraw} account={selectedAccount} />
      )}
      {isDepositOpen && (
        <Deposit closeModal={closeDeposit} account={selectedAccount} />
      )}
    </AppLayout>
  );
}

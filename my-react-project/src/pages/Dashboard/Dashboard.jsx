import React, { useEffect, useState } from "react";
import AppLayout from "../../Layout/app";
import RegisterAccountModal from "../../Components/Modal/RegisterAccountModal";
import { useNavigate } from "react-router-dom";
import { useGetDashboardData } from "../../Hooks/useGetDashboardData";
import { useGetTransaction } from "../../Hooks/useGetTransaction";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const { getDashboardData } = useGetDashboardData();
  const { getTransactions } = useGetTransaction();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const effectFn = async () => {
    try {
      const accountsData = await getDashboardData();
      const transactionsData = await getTransactions();
      console.log("Accounts:", accountsData);
      console.log("Transactions:", transactionsData);
      setAccounts(accountsData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token || token === null) navigate("/");
    effectFn();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

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

  // Calculate total balance across all accounts
  const totalBalance = accounts.reduce((sum, account) => {
    return sum + calculateAccountBalance(account.account_number);
  }, 0);

  // Calculate balance per account type
  const getBalanceByType = (type) => {
    return accounts
      .filter((account) => account.account_type === type)
      .reduce((sum, account) => {
        return sum + calculateAccountBalance(account.account_number);
      }, 0);
  };

  const getTransactionStyle = (type = "") => {
    switch (type.toLowerCase()) {
      case "deposit":
        return { color: "text-green-600", bg: "bg-green-500" };
      case "withdrawal":
      case "withdraw":
        return { color: "text-red-600", bg: "bg-red-500" };
      case "transfer":
        return { color: "text-gray-600", bg: "bg-gray-500" };
      default:
        return { color: "text-blue-600", bg: "bg-blue-500" };
    }
  };

  // Group accounts by type
  const accountTypes = [
    ...new Set(accounts.map((account) => account.account_type)),
  ];

  return (
    <div className="dashboard-section">
      <AppLayout>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Account Overview Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
            <div className="flex flex-col space-y-4">
              {/* Total Balance */}
              <div className="border-b pb-4">
                <p className="text-gray-600">Total Balance</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalBalance)}
                </p>
              </div>

              {/* Account Type Summaries */}
              <div className="space-y-4">
                {accountTypes.map((type, index) => {
                  const accountsOfType = accounts.filter(
                    (acc) => acc.account_type === type
                  );
                  return (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <h3 className="text-lg font-semibold capitalize mb-2">
                        {type} Accounts ({accountsOfType.length})
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Total: {formatCurrency(getBalanceByType(type))}
                      </p>
                      {accountsOfType.map((account, accIndex) => (
                        <div
                          key={accIndex}
                          className="bg-gray-50 p-3 rounded-md mb-2 last:mb-0"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium">
                                Account #{account.account_number}
                              </p>
                              <p className="text-xs text-gray-500">
                                {account.documentId}
                              </p>
                            </div>
                            <p className="text-sm font-semibold">
                              {formatCurrency(
                                calculateAccountBalance(account.account_number)
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Transactions Card */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <p className="text-sm text-gray-500">Last 5 transactions</p>
            </div>
            <div className="space-y-4">
              {transactions && transactions.length > 0 ? (
                transactions.slice(0, 5).map((transaction, index) => {
                  const style = getTransactionStyle(transaction.type);
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b pb-3"
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${style.bg}`}
                        ></span>
                        <div>
                          <p className="font-semibold">
                            {transaction.type.charAt(0).toUpperCase() +
                              transaction.type.slice(1)}
                          </p>
                          <p className="text-xs text-gray-500">
                            Account #{transaction.account_number}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(
                              transaction.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className={`font-semibold ${style.color}`}>
                        {transaction.type.toLowerCase() === "deposit"
                          ? "+"
                          : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">No recent transactions</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
                onClick={openModal}
              >
                Register New Account
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && <RegisterAccountModal closeModal={closeModal} />}
      </AppLayout>
    </div>
  );
}

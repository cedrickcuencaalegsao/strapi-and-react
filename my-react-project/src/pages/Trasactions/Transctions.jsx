// Transaction.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AppLayout from "../../Layout/app";
import { useGetTransaction } from "../../Hooks/useGetTransaction";

export default function Transaction() {
  const navigate = useNavigate();
  const { getTransactions } = useGetTransaction();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token || token === null) {
      navigate("/");
      return;
    }

    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        setError(error.message || "Failed to fetch transactions");
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Transaction History
        </h1>

        {/* Transactions List */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          {isLoading ? (
            <div className="text-center py-4">Loading transactions...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-4">No transactions found</div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center border-b border-gray-300 pb-4"
                >
                  <div>
                    <p className="text-lg font-semibold">
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}{" "}
                      - {transaction.account_number}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(transaction.createdAt)}
                    </p>
                    <p className="text-xs text-gray-400">
                      ID: {transaction.documentId}
                    </p>
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      transaction.type === "deposit"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.type === "deposit" ? "+" : "-"}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

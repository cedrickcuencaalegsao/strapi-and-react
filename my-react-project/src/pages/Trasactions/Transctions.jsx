import AppLayout from "../../Layout/app";

export default function Transaction() {
  // Example data for transactions
  const transactions = [
    {
      id: 1,
      date: "2024-10-28",
      description: "Purchase at Store X",
      amount: -150.75,
      type: "Debit",
    },
    {
      id: 2,
      date: "2024-10-27",
      description: "Transfer from Savings",
      amount: 2000.00,
      type: "Credit",
    },
    {
      id: 3,
      date: "2024-10-25",
      description: "Payment to Vendor Y",
      amount: -500.00,
      type: "Debit",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700">Filter Transactions</h3>
          <div className="flex space-x-4 mt-4">
            <select className="border border-gray-300 p-2 rounded-md">
              <option>Date</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
            <select className="border border-gray-300 p-2 rounded-md">
              <option>Transaction Type</option>
              <option>All</option>
              <option>Credit</option>
              <option>Debit</option>
            </select>
            <input
              type="number"
              placeholder="Min Amount"
              className="border border-gray-300 p-2 rounded-md"
            />
            <input
              type="number"
              placeholder="Max Amount"
              className="border border-gray-300 p-2 rounded-md"
            />
            <button className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center border-b border-gray-300 pb-4"
              >
                <div>
                  <p className="text-lg font-semibold">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <div
                  className={`text-sm font-semibold ${
                    transaction.type === "Credit" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {transaction.type === "Credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Transaction Button */}
        <div className="flex justify-end">
          <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700">
            Add New Transaction
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

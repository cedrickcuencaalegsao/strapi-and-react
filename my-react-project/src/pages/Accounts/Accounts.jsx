import AppLayout from "../../Layout/app";

export default function Accounts() {
  // Example data for bank accounts
  const accounts = [
    {
      accountName: "Checking Account",
      accountNumber: "1234567890",
      balance: "$5,000.00",
      currency: "USD",
    },
    {
      accountName: "Savings Account",
      accountNumber: "9876543210",
      balance: "$15,000.00",
      currency: "USD",
    },
    {
      accountName: "Business Account",
      accountNumber: "1122334455",
      balance: "$50,000.00",
      currency: "USD",
    },
  ];

  return (
    <AppLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800">{account.accountName}</h2>
            <p className="text-gray-600 mt-2">Account Number: {account.accountNumber}</p>
            <div className="mt-4">
              <p className="text-xl font-bold text-gray-900">
                {account.balance}
                <span className="text-sm text-gray-500 ml-1">{account.currency}</span>
              </p>
            </div>
            <div className="mt-4 flex justify-between">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-200">
                View Details
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-200">
                Transfer
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}

import AppLayout from "../../Layout/app";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Account Overview Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-600">Account Balance</p>
              <p className="text-2xl font-bold text-green-600">$12,345.67</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Available Balance</p>
              <p className="text-xl font-semibold text-gray-800">$10,000.00</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Account Type</p>
              <p className="text-xl font-semibold text-gray-800">Savings</p>
            </div>
          </div>
        </div>

        {/* Recent Transactions Card */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {/* Transaction 1 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <p className="font-semibold">Deposit</p>
              </div>
              <p className="font-semibold text-green-600">+ $500.00</p>
            </div>
            {/* Transaction 2 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <p className="font-semibold">Withdrawal</p>
              </div>
              <p className="font-semibold text-red-600">- $50.00</p>
            </div>
            {/* Transaction 3 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-500"></span>
                <p className="font-semibold">Transfer</p>
              </div>
              <p className="font-semibold text-gray-600">- $200.00</p>
            </div>
            {/* Transaction 4 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <p className="font-semibold">Payment</p>
              </div>
              <p className="font-semibold text-blue-600">- $100.00</p>
            </div>
          </div>
        </div>

        {/* Quick Actions (now in a row) */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto">
              Deposit Funds
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 w-full sm:w-auto">
              Withdraw Funds
            </button>
            <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300 w-full sm:w-auto">
              Transfer Funds
            </button>
            <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 w-full sm:w-auto">
              Bill Payments
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

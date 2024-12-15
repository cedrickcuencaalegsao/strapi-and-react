import React, { useState } from "react";
import { useCreateAccount } from "../../Hooks/useCreateAccount";

export default function Deposit({ closeModal }) {
  const { createAccount } = useCreateAccount();
  const [accountType, setAccountType] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const email = sessionStorage.getItem("email");

  const handleAccountTypeChange = (event) => {
    const value = event.target.value;
    setAccountType(value);
    setIsSubmitEnabled(value !== "");
  };

  const generateAccountNumber = () => {
    return Math.floor(Math.random() * 1e15)
      .toString()
      .padStart(15, "0");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newAccount = {
      data: {
        account_type: accountType,
        account_number: generateAccountNumber(),
        amount: 0.0,
        email,
      },
    };
    const response = await createAccount(newAccount);
    response && closeModal();
  };

  return (
    <div className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">Deposit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="account-type"
              className="block text-sm font-medium text-gray-600"
            >
              Account Type
            </label>
            <select
              id="account-type"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={accountType}
              onChange={handleAccountTypeChange}
            >
              <option value="">Select Account Type</option>
              <option value="savings">Savings Account</option>
              <option value="checking">Checking Account</option>
              <option value="business">Business Account</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="account-type"
              className="block text-sm font-medium text-gray-600"
            >
              Amount
            </label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={!isSubmitEnabled}
            >
              Deposit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

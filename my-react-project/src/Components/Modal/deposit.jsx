// src/Components/Modal/deposit.jsx
import React, { useState } from "react";
import { useDeposit } from "../../Hooks/useDeposit";

export default function Deposit({ closeModal }) {
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const { makeDeposit, isLoading, error } = useDeposit();

  // Get both email and userId from sessionStorage
  const email = sessionStorage.getItem("email");
  const userId = sessionStorage.getItem("uuid");

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(value);
    validateForm(value, accountNumber);
  };

  const handleAccountNumberChange = (event) => {
    const value = event.target.value;
    setAccountNumber(value);
    validateForm(amount, value);
  };

  const validateForm = (amountValue, accountValue) => {
    setIsSubmitEnabled(amountValue > 0 && accountValue.length > 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const dataToDeposit = {
        data: {
          type: "deposit",
          amount: parseFloat(amount),
          account_number: accountNumber,
          email: email,
          uuid: parseInt(userId),
        },
      };

      await makeDeposit(dataToDeposit);
      closeModal();
    } catch (err) {
      console.error("Deposit failed:", err);
    }
  };

  return (
    <div className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">Deposit</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="accountNumber"
              className="block text-sm font-medium text-gray-600"
            >
              Account Number
            </label>
            <input
              id="accountNumber"
              type="text"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
              disabled={isLoading}
              placeholder="Enter account number"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-600"
            >
              Amount
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
              disabled={isLoading}
              placeholder="Enter amount"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              onClick={closeModal}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={!isSubmitEnabled || isLoading}
            >
              {isLoading ? "Processing..." : "Deposit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

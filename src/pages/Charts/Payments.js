import React from 'react';
import { FaMousePointer, FaTimes } from 'react-icons/fa';

const Payments = () => {
  // Sample data for demonstration purposes
  const paymentData = [
    { name: 'John Doe', number: '1234 5678 9012 3456', transactionId: 'T123456', transactionAmount: '$50.00' },
    // Add more payment entries as needed
  ];

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold mb-4">Payments Page</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Number</th>
            <th className="py-2 px-4 border-b">Transaction ID</th>
            <th className="py-2 px-4 border-b">Transaction Amount</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentData.map((payment, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{payment.name}</td>
              <td className="py-2 px-4 border-b">{payment.number}</td>
              <td className="py-2 px-4 border-b">{payment.transactionId}</td>
              <td className="py-2 px-4 border-b">{payment.transactionAmount}</td>
              <td className="py-2 px-4 border-b">
                <button className="icon-button" title="Right Click">
                  <FaMousePointer />
                </button>
                <button className="icon-button" title="Cross">
                  <FaTimes />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;

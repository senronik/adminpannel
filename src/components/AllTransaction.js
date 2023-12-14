import React from 'react'

const AllTransaction = () => {

    const paymentData = [
      { name: 'John Doe', number: '12345678', transactionId: 'T123456kdmfmds', transactionAmount: '50.00' ,status:"success"},
      { name: 'John Doe', number: '12345678', transactionId: 'T123456kdmfmds', transactionAmount: '50.00' ,status:"reject"},
    ];
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Phone Number
          </th>
          <th scope="col" className="px-6 py-3">
            Withdrawal Amount
          </th>
          <th scope="col" className="px-6 py-3">
            UPI
          </th>
          <th scope="col" className="px-6 py-3">
          Status
          </th>
        </tr>
      </thead>
      <tbody>
        {paymentData.map((payment, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              {payment.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {payment.number}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {payment.transactionId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {payment.transactionAmount}
            </td>
            <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
            {payment.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  )
}

export default AllTransaction;

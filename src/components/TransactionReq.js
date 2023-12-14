import React ,{ useState,useEffect } from 'react';

import { FaTimes } from 'react-icons/fa';
import { HiCheckCircle } from "react-icons/hi";
const TransactionReq = () => {

    // Sample data for demonstration purposes
    const payment = [
      { name: 'John Doe', number: '12345678', transactionId: 'T123456kdmfmds', transactionAmount: '50.00' },
      // Add more payment entries as needed
    ];
    const [paymentData, setPaymentData] = useState([]);

    useEffect(() => {
      // Fetch data from your API endpoint
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/admin/payments');
          const data = await response.json();
          console.log(data.data)
          setPaymentData(data.data); // Set the fetched data to the state variable
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []); // The empty dependency array ensures that this effect runs once when the component mounts
  
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
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {paymentData.map((payment, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              {payment.Username}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {payment.Phonenumber}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {payment.transaction_id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {payment.amount}
            </td>
            <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
              <button className="text-green-500 hover:text-green-600 focus:outline-none">
                <HiCheckCircle className="text-xl" />
              </button>
              <button className="text-red-500 hover:text-red-600 focus:outline-none">
                <FaTimes className="text-xl" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  )
}

export default TransactionReq

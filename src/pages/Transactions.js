import React, { useState } from 'react';
import TransactionReq from '../components/TransactionReq';
import AllTransaction from '../components/AllTransaction';
const Transactions = () => {
  const [activeTab, setActiveTab] = useState('account');

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
  };

  return (
    <div className='container mx-auto p-4'>
      <div className="mb-6 shadow-lg bg-white rounded-lg mt-10">
        <div className="flex flex-col sm:flex-row">
          <div
            className={`cursor-pointer py-3 px-6 text-center border-b sm:border-b-0 sm:border-r sm:border-transparent ${
              activeTab === 'account' ? 'border-b-2 border-blue-500' : ''
            }`}
            onClick={() => handleTabChange('account')}
          >
            <span className={`font-semibold ${activeTab === 'account' ? 'text-blue-500' : ''}`}>
              Transaction Request
            </span>
          </div>
          <div
            className={`cursor-pointer py-3 px-6 text-center border-b sm:border-b-0 sm:border-r sm:border-transparent ${
              activeTab === 'security' ? 'border-b-2 border-blue-500' : ''
            }`}
            onClick={() => handleTabChange('security')}
          >
            <span className={`font-semibold ${activeTab === 'security' ? 'text-blue-500' : ''}`}>
              All Transactions
            </span>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'account' && <TransactionReq/>}
          {activeTab === 'security' && <AllTransaction/>}
        </div>
      </div>
    </div>
  );
};

export default Transactions;

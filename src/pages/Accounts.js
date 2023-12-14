import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';


const Accounts = () => {

    const [users, setUsers] = useState([]);
    console.log(users)
    const pageSize = 5; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    // Calculate the total number of pages based on the pageSize
    const totalPages = Math.ceil(users.length / pageSize);

    // Filter the data based on the search term
    const filteredData = users.filter((user) =>
        user.Password.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate the index range of the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Get the current page data
    const currentPageData = filteredData.slice(startIndex, endIndex);

    // Function to handle pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Function to handle delete button click
    const handleDelete = (index) => {
        const updatedData = [...users];
        updatedData.splice(index + startIndex, 1);
        setUsers(updatedData);
    };

    // Function to handle clear button click
    const handleClearAll = () => {
        setUsers([]);
    };

    const fetchUsersData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/user/userDetails'); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch users data');
            }

            const userData = await response.json();
            setUsers(userData.data); // Set the fetched data to the state
        } catch (error) {
            console.error('Error fetching users data:', error.message);
        }
    };

    // useEffect to call the fetchUsersData function when the component mounts
    useEffect(() => {
        fetchUsersData();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    return (
        <div className="container mx-auto p-4 mt-10 bg-white">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {/* Search input */}
                <div className="p-4 mb-4 flex items-center justify-between">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-300 p-2 rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={handleClearAll}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                    >
                        Delete All
                    </button>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    {/* Table header */}
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span>Actions</span>
                            </th>
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                        {currentPageData.map((user, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{user.Username}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.Phonenumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="text-red-500 hover:text-red-600 focus:outline-none"
                                    >
                                        <FaTrash className="text-xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="flex items-center justify-end p-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                        Previous
                    </button>
                    <span className="mx-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Accounts;

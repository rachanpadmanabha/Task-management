import React, { useState } from 'react';

const CustomDropdown = ({ options, onStatusChange, selectedValue, }) => {
    const [selectedStatus, setSelectedStatus] = useState(selectedValue);
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (status) => {
        setSelectedStatus(status);
        onStatusChange(status);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left w-full">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex justify-between items-center px-4 py-2 w-full text-sm font-medium border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-50 focus:outline-none"
            >
                <div>
                    <span
                        className={`inline-block w-3 h-3 rounded-full mr-2 ${selectedStatus === "Completed"
                            ? "bg-green-500"
                            : selectedStatus === "In Progress"
                                ? "bg-yellow-500"
                                : selectedStatus === "Pending" // Updated color for Pending
                                    ? "bg-gray-500"
                                    : "bg-gray-500"
                            }`}
                    />
                    {selectedStatus}
                </div>

                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <div className="py-1">
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => handleItemClick(option)}
                                className={`cursor-pointer flex items-center px-4 py-2 text-sm font-medium ${option === selectedStatus
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <span
                                    className={`inline-block w-3 h-3 rounded-full mr-2 ${option === "Completed"
                                        ? "bg-green-500"
                                        : option === "In Progress"
                                            ? "bg-yellow-500"
                                            : option === "Pending" // Updated color for Pending
                                                ? "bg-gray-500"
                                                : "bg-gray-500"
                                        }`}
                                />
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;

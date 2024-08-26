
import React from 'react';

function Filter({ filter, setFilter }) {
    return (
        <div className="flex justify-between my-4">
            {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
                <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded ${filter === status ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    {status}
                </button>
            ))}
        </div>
    );
}

export default Filter;

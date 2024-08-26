import React, { useState, useEffect } from 'react';
import Dropdown from './DropDown'; // Make sure to import the custom Dropdown component

const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
};

function TaskForm({ task, onSubmit, onCancel, action }) {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [status, setStatus] = useState(task ? task.status : 'Pending');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task ? task.status : 'Pending');
        }
    }, [task]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            return;
        }

        onSubmit({
            ...task,
            title: title.trim(),
            description: description.trim(),
            status,
            date: task ? task.date : new Date().toLocaleDateString('en-US', options)
        });
    };

    const handleStatusSelect = (value) => {
        setStatus(value);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title"
                className="w-full p-2 mb-2 border rounded text-[#231F20] text-[12px] font-normal"
                aria-label="Task Title"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter the description"
                className="w-full p-2 mb-2 border rounded text-[#231F20] text-[12px] font-normal"
                aria-label="Task Description"
            />
            {action === 'EDIT' && (
                <div className="mb-2">
                    <Dropdown
                        options={["Pending", "In Progress", "Completed"]}
                        selectedValue={status}  // Pass the selected value
                        onStatusChange={handleStatusSelect}  // Pass the handler for selection
                        ariaLabel="Task Status"
                    />
                </div>
            )}
            <div className="flex justify-between space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-[14px] font-normal border border-[#034EA2] hover:bg-[#034EA2] hover:text-white rounded text-[#034EA2]"
                    aria-label="Cancel"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={`px-4 py-2 text-[14px] font-normal bg-[#034EA2]  text-white rounded ${title.trim() === "" || description.trim() === "" ? "bg-[#3072bd] cursor-not-allowed" : "hover:bg-[#023269]"} `}
                    disabled={(title.trim() === "" || description.trim() === "")}
                    aria-label={action === 'ADD' ? 'Add Task' : 'Update Task'}
                >
                    {action === 'ADD' ? 'Add' : 'Update'}
                </button>
            </div>
        </form>
    );
}

export default TaskForm;

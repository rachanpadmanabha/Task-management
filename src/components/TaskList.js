import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";

function TaskList({ tasks, onEdit, onDelete, onAdd }) {
    // Group tasks by status
    const groupedTasks = tasks.reduce((acc, task) => {
        if (!acc[task.status]) {
            acc[task.status] = [];
        }
        acc[task.status].push(task);
        return acc;
    }, {});

    // Determine the section with the least number of tasks
    const getLeastTasksSection = () => {
        const taskCounts = {
            "In Progress": (groupedTasks["In Progress"] || []).length,
            Completed: (groupedTasks["Completed"] || []).length,
            Pending: (groupedTasks["Pending"] || []).length,
        };

        // Filter out sections with zero tasks
        const nonEmptySections = Object.entries(taskCounts).filter(
            ([status, count]) => count > 0
        );

        if (nonEmptySections.length === 0) return null;

        const minCount = Math.min(...nonEmptySections.map(([_, count]) => count));

        // Find the status with the minimum count among non-empty sections
        const leastTasksSection = nonEmptySections.find(
            ([_, count]) => count === minCount
        );

        return leastTasksSection ? leastTasksSection[0] : null;
    };

    // Compute the default open section
    const openSection = getLeastTasksSection();

    const renderTasks = (taskList) =>
        taskList.map((task) => (
            <div
                key={task.id}
                onClick={() => onEdit(task)}
                className="border-b border-[#DDDDDD] hover:cursor-pointer last:border-none pb-4 mb-4 last:mb-0 flex items-start group hover:bg-[#F7F7F7]"
            >
                <div className="flex-grow flex items-start">
                    <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full border border-[#034EA2] flex items-center justify-center text-[#034EA2] font-semibold text-lg">
                            {task.title.charAt(0)}
                        </div>
                    </div>
                    <div className="ml-4 flex-grow">
                        <div className="flex items-center justify-between">
                            <div className="w-full p-2">
                                <div className="w-full flex justify-between">
                                    <h3 className="text-[#034EA2] text-[16px] font-semibold">
                                        {task.title}
                                    </h3>
                                    <p className={`text-sm font-medium`}>
                                        <span
                                            className={`inline-block w-3 h-3 rounded-full ${task.status === "Completed"
                                                ? "bg-green-500"
                                                : task.status === "In Progress"
                                                    ? "bg-yellow-500"
                                                    : "bg-gray-500"
                                                }`}
                                        />{" "}
                                        {task.status}
                                    </p>
                                </div>
                                <p className="text-gray-600 text-[12px]">{task.description}</p>
                                <div className="w-full flex justify-between">
                                    <p className="text-sm text-[#767676] text-[10px]">
                                        {task.date}
                                    </p>
                                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit(task);
                                            }}
                                            className="text-blue-500 hover:text-blue-700"
                                            aria-label={`Edit task: ${task.title}`}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(task.id);
                                            }}
                                            className="text-red-500 hover:text-red-700"
                                            aria-label={`Delete task: ${task.title}`}
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg overflow-scroll">
            {Object.entries(groupedTasks).map(([status, taskList]) => (
                <Disclosure key={status} defaultOpen={status === openSection}>
                    {({ open }) => (
                        <>
                            <DisclosureButton className="w-full text-left px-4 py-2 text-lg mb-4 font-semibold bg-gray-200 hover:bg-gray-300 flex justify-between items-center rounded-t-md">
                                <div>
                                    {" "}
                                    <span className="text-[12px] font-normal">{status}</span>
                                    <span className="text-[12px] font-bold">
                                        ({taskList.length})
                                    </span>
                                </div>

                                <svg
                                    className={`w-5 h-5 transform ${open ? "rotate-180" : "rotate-0"
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </DisclosureButton>
                            <DisclosurePanel className="px-4 py-2">
                                {renderTasks(taskList)}
                            </DisclosurePanel>
                        </>
                    )}
                </Disclosure>
            ))}
            {tasks.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No tasks available.</p>
                    <button
                        onClick={onAdd}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Create New Task
                    </button>
                </div>
            )}
        </div>
    );
}

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            status: PropTypes.oneOf(["Completed", "In Progress", "Pending"])
                .isRequired,
        })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired, // Add this line to handle the 'Create New Task' button click
};

export default TaskList;

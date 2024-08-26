import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Header from './Header';

function App() {
  const [tasks, setTasks] = useState([]);
  const [action, setAction] = useState("");
  const [task, setTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    console.log('Loaded tasks:', savedTasks);
    if (savedTasks && savedTasks.length > 0) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    console.log('Saving tasks:', tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAction = (type, task = null) => {
    setTask(task);
    setAction(type);
  };

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setAction("");
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setAction("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleBack = () => {
    setAction("");
  };

  return (
    <div className="relative min-h-screen p-4 max-w-2xl m-auto">
      <Header
        title={action === "" ? "TO-DO APP" : action === "ADD" ? "Add Task" : "Edit Task"}
        onBack={handleBack}
      />
      {action === "" && (
        <>
          <TaskList
            tasks={tasks}
            onEdit={(task) => handleAction("EDIT", task)}
            onDelete={deleteTask}
            onAdd={() => handleAction("ADD")} // Pass the onAdd prop
          />
          <button
            onClick={() => handleAction("ADD")}
            className="absolute bottom-4 right-4 w-12 h-12 bg-blue-600 text-white rounded-full text-2xl"
          >
            +
          </button>
        </>
      )}
      {(action === "EDIT" || action === "ADD") && (
        <TaskForm
          task={task}
          onSubmit={action === "ADD" ? addTask : updateTask}
          onCancel={() => setAction("")}
          action={action}
        />
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Header from './Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const handleFilterChange = useCallback(
    (filterValue) => {
      setFilter(filterValue);
      setFilteredTasks(tasks.filter(task => task.title.toLowerCase().includes(filterValue.toLowerCase())));
    },
    [tasks]
  );

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks && savedTasks.length > 0) {
      setTasks(savedTasks);
      setFilteredTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    handleFilterChange(filter);
  }, [tasks, filter, handleFilterChange]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    navigate('/');
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    navigate('/');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };


  return (
    <div className="relative min-h-screen p-4 max-w-2xl m-auto">

      <Routes>

        <Route
          path="/"
          element={
            <>
              <Header title="TO-DO APP" />
              <div className="relative w-full p-4">
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  placeholder="Search To-Do"
                  className="w-full h-10 pl-10 pr-4 border rounded text-[#231F20] text-[12px] font-normal"
                />
                <div className="absolute inset-y-0 left-3 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </div>
              <TaskList
                tasks={filteredTasks}
                onEdit={(task) => navigate(`/edit/${task.id}`)}
                onDelete={deleteTask}
                onAdd={() => navigate('/add')}
              />
              <button
                onClick={() => navigate('/add')}
                className="fixed bottom-4 right-4 w-[70px] h-[70px] bg-blue-600 text-white rounded-full text-2xl shadow-lg"
              >
                +
              </button>
            </>
          }
        />
        <Route
          path="/add"
          element={
            <>
              <Header title="Add Task" />
              <TaskForm
                task={null}
                onSubmit={addTask}
                onCancel={() => navigate('/')}
                action="ADD"
              />
            </>

          }
        />
        <Route
          path="/edit/:id"
          element={
            <>
              <Header title="Edit Task" />
              <EditTaskForm onSubmit={updateTask} onCancel={() => navigate('/')} /></>}
        />
      </Routes>
    </div>
  );
}

function EditTaskForm({ onSubmit, onCancel }) {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks && savedTasks.length > 0) {
      setTasks(savedTasks);
    }
  }, []);

  const task = tasks.find(task => task.id === parseInt(id));

  return task ? (
    <TaskForm
      task={task}
      onSubmit={onSubmit}
      onCancel={onCancel}
      action="EDIT"
    />
  ) : (
    <div>Loading...</div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

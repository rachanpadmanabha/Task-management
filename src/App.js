import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Header from './Header';

function App() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks && savedTasks.length > 0) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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

  const findTaskById = (id) => {
    return tasks.find(task => task.id === parseInt(id));
  };

  return (
    <div className="relative min-h-screen p-4 max-w-2xl m-auto">
      <Header title="TO-DO APP" />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TaskList
                tasks={tasks}
                onEdit={(task) => navigate(`/edit/${task.id}`)}
                onDelete={deleteTask}
                onAdd={() => navigate('/')}
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
            <TaskForm
              task={null}
              onSubmit={addTask}
              onCancel={() => navigate('/')}
              action="ADD"
            />
          }
        />
        <Route
          path="/edit/:id"
          element={<EditTaskForm onSubmit={updateTask} onCancel={() => navigate('/')} />}
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

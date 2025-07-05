import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/Themecontext';
import Header from './components/Header'; // ✅ Correct
import TaskForm from './components/TaskForm'; // ✅ Correct
import FilterButtons from './components/FilterButtons'; // ✅ Correct
import TaskList from './components/TaskList'; // ✅ Correct
import TaskStats from './components/TaskStats'; // ✅ Correct
import { useLocalStorage } from './hooks/useLocalStorage';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate loading tasks from API
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load tasks');
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = (task) => {
    setTasks(prev => [...prev, task]);
  };

  const toggleTask = (id) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <TaskStats tasks={tasks} />
      <TaskForm onAddTask={addTask} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      <TaskList 
        tasks={filteredTasks} 
        onToggle={toggleTask} 
        onDelete={deleteTask}
        isLoading={isLoading}
      />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Header />
      <TaskManager />
    </ThemeProvider>
  );
};

export default App;
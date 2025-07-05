import React, { useReducer, useState, useEffect } from 'react';
import taskAPI from './tasks/taskAPI';
import taskReducer from './tasks/taskReducer';
import Header from '../../components/Header';
import Statistics from '../../components/Statistics';
import TaskCard from '../../components/TaskCard';
import TaskForm from '../../components/TaskForm';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';

const initialState = {
  tasks: [],
  searchTerm: '',
  filter: 'all',
};

const TaskManagementApp = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const tasks = await taskAPI.getTasks();
      dispatch({ type: 'SET_TASKS', payload: tasks });
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      setFormLoading(true);
      const newTask = await taskAPI.createTask(taskData);
      dispatch({ type: 'ADD_TASK', payload: newTask });
      setShowForm(false);
    } catch (err) {
      setError('Failed to create task. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      setFormLoading(true);
      const updatedTask = await taskAPI.updateTask(taskData);
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
      setShowForm(false);
      setEditingTask(null);
    } catch (err) {
      setError('Failed to update task. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(taskId);
        dispatch({ type: 'DELETE_TASK', payload: taskId });
      } catch (err) {
        setError('Failed to delete task. Please try again.');
      }
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const task = state.tasks.find(t => t.id === taskId);
      const updatedTask = { ...task, completed };
      const result = await taskAPI.updateTask(updatedTask);
      dispatch({ type: 'UPDATE_TASK', payload: result });
    } catch (err) {
      setError('Failed to update task status. Please try again.');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      handleUpdateTask(taskData);
    } else {
      handleCreateTask(taskData);
    }
  };

  // Filter and search tasks
  const filteredTasks = state.tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(state.searchTerm.toLowerCase());

    const matchesFilter = state.filter === 'all' ||
                         (state.filter === 'completed' && task.completed) ||
                         (state.filter === 'pending' && !task.completed) ||
                         (state.filter === 'high' && task.priority === 'high');

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCreateTask={() => setShowForm(true)}
        searchTerm={state.searchTerm}
        onSearchChange={(term) => dispatch({ type: 'SET_SEARCH', payload: term })}
        filter={state.filter}
        onFilterChange={(filter) => dispatch({ type: 'SET_FILTER', payload: filter })}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <ErrorMessage message={error} onRetry={loadTasks} />
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Statistics tasks={state.tasks} />

            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {state.searchTerm || state.filter !== 'all'
                    ? 'No tasks match your current filters.'
                    : 'No tasks yet. Create your first task to get started!'
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onToggleComplete={handleToggleComplete}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onCancel={handleFormCancel}
          isLoading={formLoading}
        />
      )}
    </div>
  );
};
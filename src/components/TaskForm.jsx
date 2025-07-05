import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTheme } from '../contexts/Themecontext';

const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = async () => {
    if (!newTask.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    onAddTask(task);
    setNewTask('');
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
          className={`flex-1 px-4 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={!newTask.trim() || isLoading}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
            !newTask.trim() || isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
          }`}
        >
          <Plus className="w-4 h-4" />
          {isLoading ? 'Adding...' : 'Add Task'}
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
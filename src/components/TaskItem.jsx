import React, { useState } from 'react';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import { useTheme } from '../contexts/Themecontext';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { theme } = useTheme();

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    onDelete(task.id);
  };

  return (
    <div className={`p-4 rounded-lg border transition-all duration-200 ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
        : 'bg-white border-gray-200 hover:shadow-md'
    } ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 transition-colors duration-200 ${
            task.completed
              ? 'text-green-600 hover:text-green-700'
              : theme === 'dark'
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {task.completed ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>
        
        <span className={`flex-1 ${
          task.completed 
            ? 'line-through text-gray-500' 
            : theme === 'dark' 
              ? 'text-gray-100' 
              : 'text-gray-900'
        }`}>
          {task.text}
        </span>
        
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`flex-shrink-0 p-1 rounded transition-colors duration-200 ${
            isDeleting
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20'
          }`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className={`text-xs mt-2 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
      }`}>
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default TaskItem;
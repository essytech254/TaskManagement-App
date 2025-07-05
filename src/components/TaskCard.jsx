import React, { useState } from 'react';
import { Edit2, Trash2, Check, Calendar, User, Clock } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      await onToggleComplete(task.id, !task.completed);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg border ${
      task.completed ? 'opacity-75 bg-gray-50' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center flex-grow">
          <button
            onClick={handleToggleComplete}
            disabled={isLoading}
            className={`mr-3 p-2 rounded-full transition-all duration-200 ${
              task.completed
                ? 'bg-green-500 text-white shadow-md'
                : 'border-2 border-gray-300 hover:border-green-500 hover:bg-green-50'
            }`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Check className="h-4 w-4" />
            )}
          </button>
          
          <div className="flex-grow">
            <h3 className={`text-lg font-semibold mb-2 ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
              getPriorityColor(task.priority)
            }`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
            title="Edit task"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
            title="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <p className={`text-gray-600 mb-4 ${task.completed ? 'line-through' : ''}`}>
        {task.description}
      </p>
      
      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          <span>{task.assignee}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span className={task.completed ? 'text-green-600' : 'text-orange-600'}>
            {task.completed ? 'Completed' : 'In Progress'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
import React from 'react';
import TaskItem from './TaskItem';
import { useTheme } from '../contexts/Themecontext';

const TaskList = ({ tasks, onToggle, onDelete, isLoading }) => {
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Loading tasks...
        </p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className={`text-center py-8 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <p>No tasks found. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
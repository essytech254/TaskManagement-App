import React from 'react';
import { useTheme } from '../contexts/Themecontext';

const TaskStats = ({ tasks }) => {
  const { theme } = useTheme();
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const active = total - completed;

  return (
    <div className={`grid grid-cols-3 gap-4 mb-6 ${
      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
    }`}>
      <div className={`p-4 rounded-lg text-center ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'
      }`}>
        <div className="text-2xl font-bold text-blue-600">{total}</div>
        <div className="text-sm">Total</div>
      </div>
      <div className={`p-4 rounded-lg text-center ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'
      }`}>
        <div className="text-2xl font-bold text-orange-600">{active}</div>
        <div className="text-sm">Active</div>
      </div>
      <div className={`p-4 rounded-lg text-center ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'
      }`}>
        <div className="text-2xl font-bold text-green-600">{completed}</div>
        <div className="text-sm">Completed</div>
      </div>
    </div>
  );
};

export default TaskStats;
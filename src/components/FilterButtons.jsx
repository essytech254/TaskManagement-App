import React from 'react';
import { useTheme } from '../contexts/Themecontext';

const FilterButtons = ({ filter, setFilter }) => {
  const { theme } = useTheme();
  const filters = ['All', 'Active', 'Completed'];

  return (
    <div className="flex gap-2 mb-6">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            filter === f
              ? 'bg-blue-600 text-white scale-105'
              : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
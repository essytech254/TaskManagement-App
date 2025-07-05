import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/Themecontext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={`shadow-sm border-b transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">TaskManager</h1>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            theme === 'dark'
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
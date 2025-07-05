import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckSquare } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <CheckSquare className="h-8 w-8" />
            <span className="text-xl font-bold">TaskManager</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                location.pathname === '/' 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/tasks"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                location.pathname === '/tasks' 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <CheckSquare className="h-4 w-4" />
              <span>Tasks</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
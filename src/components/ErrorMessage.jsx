import React from 'react';
import { X } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
    <div className="flex items-center">
      <X className="h-5 w-5 text-red-500 mr-2" />
      <p className="text-red-700">{message}</p>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);

export default ErrorMessage;
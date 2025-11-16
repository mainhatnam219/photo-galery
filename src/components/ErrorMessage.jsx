import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-red-500 text-5xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-4">{message || 'Failed to load data. Please try again.'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

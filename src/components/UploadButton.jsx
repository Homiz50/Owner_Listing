import React from 'react';

const UploadButton = ({ onClick, disabled, isLoading, text }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        w-full sm:w-auto px-6 py-2.5 rounded-md font-medium text-white shadow-sm transition-all duration-200
        flex items-center justify-center gap-2
        ${disabled 
          ? 'bg-gray-400 cursor-not-allowed opacity-70' 
          : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-200'
        }
      `}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Uploading...</span>
        </>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default UploadButton;

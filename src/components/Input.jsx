import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, disabled, required, error, min, max }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
          ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900'}
          ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'}
        `}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;

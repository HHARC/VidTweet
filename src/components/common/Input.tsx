import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, className, ...props }, ref) => {
    const widthClasses = fullWidth ? 'w-full' : '';
    const errorClasses = error
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-300 dark:border-gray-700';

    return (
      <div className={`${widthClasses} ${className || ''}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="mb-1 block text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          className={`input ${errorClasses}`}
          {...props}
        />
        
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
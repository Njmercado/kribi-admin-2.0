import React, { InputHTMLAttributes } from 'react';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  fullWidth?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const generatedId = id || `textfield-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`relative flex flex-col ${widthClass} ${className} mt-4 mb-2`}>
      <input
        id={generatedId}
        placeholder=" "
        className={`peer w-full h-14 bg-transparent text-text-primary px-4 pt-4 pb-1 border-2 rounded outline-none transition-colors duration-200
          ${error ? 'border-error focus:border-error' : 'border-gray-300 focus:border-primary'}
          ${props.disabled ? 'text-text-disabled border-gray-200 bg-gray-50 cursor-not-allowed' : ''}
        `}
        {...props}
      />
      <label
        htmlFor={generatedId}
        className={`absolute left-3 top-4 px-1 text-base transition-all duration-200 pointer-events-none bg-surface
          peer-focus:-top-2.5 peer-focus:text-sm
          peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-sm
          ${error ? 'text-error peer-focus:text-error' : 'text-text-secondary peer-focus:text-primary'}
          ${props.disabled ? 'text-text-disabled' : ''}
        `}
      >
        {label}
      </label>
      {error && (
        <span className="text-error text-xs mt-1 ml-3 font-medium">
          {error}
        </span>
      )}
    </div>
  );
};

import React, { HTMLAttributes } from 'react';

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  color?: 'default' | 'primary' | 'secondary' | 'error';
  variant?: 'filled' | 'outlined';
  onDelete?: () => void;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  color = 'default',
  variant = 'filled',
  onDelete,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full text-sm h-8 px-3 transition-colors';

  const colors = {
    filled: {
      default: 'bg-gray-200 text-text-primary',
      primary: 'bg-primary text-on-primary',
      secondary: 'bg-secondary text-on-secondary',
      error: 'bg-error text-on-error',
    },
    outlined: {
      default: 'border border-gray-300 text-text-primary',
      primary: 'border border-primary text-primary',
      secondary: 'border border-secondary text-secondary',
      error: 'border border-error text-error',
    }
  };

  const deleteColors = {
    filled: {
      default: 'hover:text-gray-600',
      primary: 'hover:text-primary-light',
      secondary: 'hover:text-pink-200',
      error: 'hover:text-red-200',
    },
    outlined: {
      default: 'text-gray-500 hover:text-gray-700',
      primary: 'text-primary hover:text-primary-dark',
      secondary: 'text-secondary hover:text-[#c51162]',
      error: 'text-error hover:text-[#8e0000]',
    }
  }

  return (
    <div
      className={`${baseClasses} ${colors[variant][color]} ${className}`}
      {...props}
    >
      <span className="truncate max-w-[150px]">{label}</span>
      {onDelete && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className={`ml-1 -mr-1 rounded-full p-0.5 focus:outline-none ${deleteColors[variant][color]}`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
          </svg>
        </button>
      )}
    </div>
  );
};

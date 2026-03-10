import React, { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'error' | 'default';
  size?: 'small' | 'medium' | 'large';
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  color = 'default',
  size = 'medium',
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    small: 'p-1',
    medium: 'p-2',
    large: 'p-3',
  };

  const colorClasses = {
    default: 'text-text-secondary hover:bg-gray-100 focus:ring-gray-300',
    primary: 'text-primary hover:bg-primary-light/20 focus:ring-primary',
    secondary: 'text-secondary hover:bg-[#f50057]/10 focus:ring-secondary',
    error: 'text-error hover:bg-error/10 focus:ring-error',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

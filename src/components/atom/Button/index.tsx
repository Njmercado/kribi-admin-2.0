import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  color = 'primary',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded uppercase tracking-wider transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none min-w-[64px] px-4 py-2 text-sm shadow-elevation-2 active:shadow-elevation-4 hover:shadow-elevation-4';

  const variantClasses = {
    contained: {
      primary: 'bg-primary text-on-primary hover:bg-primary-dark focus:ring-primary',
      secondary: 'bg-secondary text-on-secondary hover:bg-[#c51162] focus:ring-secondary',
      error: 'bg-error text-on-error hover:bg-[#8e0000] focus:ring-error',
    },
    outlined: {
      primary: 'border-2 border-primary text-primary hover:bg-primary-light/20 focus:ring-primary shadow-none active:shadow-none hover:shadow-none',
      secondary: 'border-2 border-secondary text-secondary hover:bg-[#f50057]/10 focus:ring-secondary shadow-none active:shadow-none hover:shadow-none',
      error: 'border-2 border-error text-error hover:bg-error/10 focus:ring-error shadow-none active:shadow-none hover:shadow-none',
    },
    text: {
      primary: 'text-primary hover:bg-primary-light/20 focus:ring-primary shadow-none active:shadow-none hover:shadow-none',
      secondary: 'text-secondary hover:bg-[#f50057]/10 focus:ring-secondary shadow-none active:shadow-none hover:shadow-none',
      error: 'text-error hover:bg-error/10 focus:ring-error shadow-none active:shadow-none hover:shadow-none',
    },
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant][color]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

import React, { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevation = 1,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-surface rounded-lg shadow-elevation-${elevation} overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`p-4 flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`p-4 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

export const CardActions: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`p-2 flex items-center justify-end space-x-2 ${className}`} {...props}>
    {children}
  </div>
);

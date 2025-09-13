// FIX: Import React to use React.forwardRef.
import React from 'react';

export const Card = ({ children, className = '' }) => {
    return (
      <div className={`bg-card border border-gray-200 rounded-lg overflow-hidden ${className}`}>
        {children}
      </div>
    );
};

export const Button = React.forwardRef(
    ({ children, variant = 'primary', fullWidth = false, className = '', ...props }, ref) => {
      const baseClasses = 'inline-flex items-center justify-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
      const variantClasses = {
        primary: 'bg-primary text-white hover:bg-primary-dark',
        secondary: 'bg-secondary text-primary border border-primary hover:bg-blue-100',
        ghost: 'text-gray-600 hover:bg-gray-100',
      };
      const sizeClasses = 'px-4 py-2 text-sm';
      const widthClass = fullWidth ? 'w-full' : '';

      return (
        <button
          ref={ref}
          className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses} ${widthClass} ${className}`}
          {...props}
        >
          {children}
        </button>
      );
    }
);
Button.displayName = 'Button';

export const Avatar = ({ src, alt, size = 'md', className = '' }) => {
    const sizeClasses = {
      sm: 'h-8 w-8',
      md: 'h-12 w-12',
      lg: 'h-24 w-24',
      xl: 'h-40 w-40',
    };
    return (
      <img
        src={src}
        alt={alt}
        className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
      />
    );
};

export const Input = React.forwardRef(
    ({ label, id, className, ...props }, ref) => {
      return (
        <div>
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 sr-only">{label}</label>
          <input
            ref={ref}
            id={id}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${className}`}
            {...props}
          />
        </div>
      );
    }
);
Input.displayName = 'Input';
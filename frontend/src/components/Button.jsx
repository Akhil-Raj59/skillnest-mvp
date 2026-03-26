import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-6 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 border border-gray-200",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-200",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

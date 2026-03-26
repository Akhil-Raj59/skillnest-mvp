import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 text-gray-300 py-10 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center items-center">
                <div className="text-2xl font-black text-white flex items-center gap-2 tracking-tight mb-4">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-xl shadow-lg">SN</span>
                    SkillNest
                </div>
                <p className="max-w-md mx-auto text-sm text-gray-400 mb-6 leading-relaxed">
                    A modern course discovery and enrollment platform built as a high-quality internship assignment.
                </p>
                <div className="w-full max-w-lg h-px bg-gray-800 mb-6"></div>
                <p className="text-sm font-medium">© {new Date().getFullYear()} SkillNest Project. Created for demonstration.</p>
            </div>
        </footer>
    );
};

export default Footer;

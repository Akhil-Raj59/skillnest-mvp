import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-[calc(100vh-4rem-4rem)] flex items-center justify-center bg-gray-50 p-6">
            <div className="text-center max-w-lg">
                <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Compass size={48} />
                </div>
                <h1 className="text-7xl font-black text-gray-900 mb-4 tracking-tighter">404</h1>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Content Not Found</h2>
                <p className="text-gray-500 mb-8 text-lg leading-relaxed">
                    Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
                </p>
                <Link to="/" className="inline-block bg-gray-900 hover:bg-blue-600 text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Compass, ArrowRight } from 'lucide-react';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome back, {user?.name.split(' ')[0]}! 👋</h1>
                <p className="text-gray-600 text-lg">Ready to continue your learning journey?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h3 className="text-gray-500 font-bold text-sm uppercase mb-1">Learning Status</h3>
                        <p className="text-2xl font-black text-gray-900">Active</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                        <Award size={24} />
                    </div>
                    <div>
                        <h3 className="text-gray-500 font-bold text-sm uppercase mb-1">Certificates</h3>
                        <p className="text-2xl font-black text-gray-900">0 Earned</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-xl text-green-600">
                        <Compass size={24} />
                    </div>
                    <div>
                        <h3 className="text-gray-500 font-bold text-sm uppercase mb-1">Pathways</h3>
                        <p className="text-2xl font-black text-gray-900">Explore</p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 mix-blend-overlay filter blur-3xl -translate-y-1/2 translate-x-1/4 rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 mix-blend-overlay filter blur-2xl translate-y-1/2 -translate-x-1/4 rounded-full"></div>
                <div className="relative z-10 md:w-2/3">
                    <h2 className="text-3xl font-bold mb-4">Jump Right In</h2>
                    <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                        You have enrolled courses waiting for you. Pick up where you left off or explore new topics to expand your skillset.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/dashboard/my-courses" className="bg-white text-blue-800 hover:bg-gray-50 font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors">
                            Go to My Courses
                        </Link>
                        <Link to="/courses" className="bg-blue-800/50 border border-blue-600/50 hover:bg-blue-800/80 hover:border-blue-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm">
                            Browse Catalog <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

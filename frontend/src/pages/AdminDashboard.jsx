import React, { useEffect, useState } from 'react';
import { courseService } from '../services/courseService';
import { BookOpen, Users, DollarSign, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalCourses: 0, totalRevenue: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const courses = await courseService.getCourses();
                const totalRevenue = courses.reduce((acc, curr) => acc + curr.price, 0); 
                setStats({ totalCourses: courses.length, totalRevenue });
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Admin Portal</h1>
                <p className="text-gray-600">Overview of platform metrics and management controls.</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                <BookOpen size={24} />
                            </div>
                            <span className="flex items-center text-sm font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg"><ArrowUpRight size={16}/> 12%</span>
                        </div>
                        <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wide mb-1">Total Courses</h3>
                        <p className="text-4xl font-black text-gray-900">{stats.totalCourses}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                                <Users size={24} />
                            </div>
                            <span className="flex items-center text-sm font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg text-xs">Waiting</span>
                        </div>
                        <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wide mb-1">Total Students</h3>
                        <p className="text-4xl font-black text-gray-900">--</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-green-100 p-3 rounded-xl text-green-600">
                                <DollarSign size={24} />
                            </div>
                            <span className="flex items-center text-sm font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg text-xs"><ArrowUpRight size={16}/> Active</span>
                        </div>
                        <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wide mb-1">Catalog Value</h3>
                        <p className="text-4xl font-black text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                    </div>
                </div>
            )}

            <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
                <div className="relative z-10 md:w-2/3">
                    <h2 className="text-3xl font-bold mb-3">Course Management Area</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">Add, edit, or remove courses to keep your platform's catalog fresh and up-to-date for new students.</p>
                </div>
                <div className="relative z-10">
                    <Link to="/admin/courses" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg block text-center whitespace-nowrap text-lg">
                        Manage Courses
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

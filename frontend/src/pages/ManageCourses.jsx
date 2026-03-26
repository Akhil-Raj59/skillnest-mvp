import React, { useEffect, useState } from 'react';
import { courseService } from '../services/courseService';
import { Link } from 'react-router-dom';
import { Edit, Trash2, PlusCircle, AlertTriangle } from 'lucide-react';

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ show: false, courseId: null, title: '' });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const data = await courseService.getCourses();
            setCourses(data);
        } catch (error) {
            console.error("Failed fetching courses", error);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = async () => {
        try {
            await courseService.deleteCourse(deleteModal.courseId);
            setCourses(courses.filter(c => c._id !== deleteModal.courseId));
            setDeleteModal({ show: false, courseId: null, title: '' });
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-gray-100 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manage Courses</h1>
                    <p className="text-gray-500 mt-2">View, modify, or remove courses from the catalog.</p>
                </div>
                <Link to="/admin/courses/add" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                    <PlusCircle size={20} /> Add New Course
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
            ) : courses.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                                    <th className="px-6 py-4 border-b border-gray-100">Course Info</th>
                                    <th className="px-6 py-4 border-b border-gray-100">Category</th>
                                    <th className="px-6 py-4 border-b border-gray-100">Price</th>
                                    <th className="px-6 py-4 border-b border-gray-100 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {courses.map(course => (
                                    <tr key={course._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                                                    <img src={course.image || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80'} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 line-clamp-1">{course.title}</p>
                                                    <p className="text-sm text-gray-500 hidden md:block">⏱ {course.duration}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold tracking-wide border border-blue-100">
                                                {course.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900">${course.price}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Link to={`/admin/courses/edit/${course._id}`} className="text-gray-500 hover:text-blue-600 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-100 p-2 rounded-lg transition-colors">
                                                    <Edit size={18} />
                                                </Link>
                                                <button 
                                                    onClick={() => setDeleteModal({ show: true, courseId: course._id, title: course.title })}
                                                    className="text-gray-500 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-100 p-2 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 mb-4 text-lg">No courses exist yet.</p>
                </div>
            )}

            {/* Delete Modal */}
            {deleteModal.show && (
                <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-fade-in-down border border-gray-100">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">Delete Course</h3>
                        <p className="text-gray-500 text-center mb-8">
                            Are you sure you want to delete <span className="font-bold text-gray-800">"{deleteModal.title}"</span>? This action cannot be undone.
                        </p>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setDeleteModal({ show: false, courseId: null, title: '' })}
                                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDelete}
                                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCourses;

import React, { useEffect, useState } from 'react';
import { enrollmentService } from '../services/enrollmentService';
import CourseCard from '../components/CourseCard';
import { Link } from 'react-router-dom';
import { Search, BookOpen } from 'lucide-react';

const MyCoursesPage = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const data = await enrollmentService.getMyCourses();
                setEnrollments(data);
            } catch (error) {
                console.error('Failed to fetch enrolled courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEnrollments();
    }, []);

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-full">
            <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-100 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">My Enrollments</h1>
                    <p className="text-gray-600">Access and track progress on all your enrolled courses.</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
            ) : enrollments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {enrollments.map(enrollment => (
                        <CourseCard 
                            key={enrollment.course._id} 
                            course={enrollment.course} 
                            isEnrolled={true} 
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="text-blue-500" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No courses yet</h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't enrolled in any courses. Explore our catalog to start your learning journey.</p>
                    <Link to="/courses" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        <Search size={20} /> Browse Catalog
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyCoursesPage;

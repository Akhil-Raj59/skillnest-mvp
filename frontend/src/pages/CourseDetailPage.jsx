import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { enrollmentService } from '../services/enrollmentService';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import { Clock, Tag, CreditCard, ChevronLeft } from 'lucide-react';

const CourseDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrollLoading, setEnrollLoading] = useState(false);
    const [enrolled, setEnrolled] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const data = await courseService.getCourseById(id);
                setCourse(data);
                
                if (user) {
                    const myEnrollments = await enrollmentService.getMyCourses();
                    const isEnrolled = myEnrollments.some(e => e.course._id === id);
                    setEnrolled(isEnrolled);
                }
            } catch (error) {
                console.error('Failed to fetch course details:', error);
                setError('Failed to load course details.');
            } finally {
                setLoading(false);
            }
        };
        fetchCourseData();
    }, [id, user]);

    const handleEnroll = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setEnrollLoading(true);
        setError('');
        try {
            await enrollmentService.enroll(course._id);
            setSuccess('Successfully enrolled in the course!');
            setEnrolled(true);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to enroll');
        } finally {
            setEnrollLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!course) {
        return <div className="text-center py-20 text-xl font-medium text-gray-500">Course not found</div>;
    }

    return (
        <div className="bg-gray-50 min-h-[calc(100vh-4rem)] py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium mb-6 transition-colors"
                >
                    <ChevronLeft size={20} /> Back to Courses
                </button>

                {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 font-medium border border-red-100">{error}</div>}
                {success && <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 font-medium border border-green-100">{success}</div>}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2 relative h-64 md:h-auto bg-gray-100">
                            <img 
                                src={course.image || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80'} 
                                alt={course.title} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide mb-4 w-max shadow-sm border border-blue-100">
                                {course.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                {course.description}
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2.5 rounded-xl shadow-sm font-medium text-blue-600 border border-gray-100"><Clock size={20} /></div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Duration</p>
                                        <p className="font-bold text-gray-900">{course.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2.5 rounded-xl shadow-sm font-medium text-green-600 border border-gray-100"><CreditCard size={20} /></div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Price</p>
                                        <p className="font-bold text-gray-900">${course.price}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-100">
                                {enrolled ? (
                                    <Button disabled variant="secondary" className="w-full py-4 text-lg font-bold flex items-center justify-center gap-2 border-green-200 bg-green-50 text-green-700 rounded-xl">
                                        You are Enrolled ✓
                                    </Button>
                                ) : (
                                    <Button 
                                        onClick={handleEnroll} 
                                        disabled={enrollLoading} 
                                        className="w-full py-4 text-lg font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all rounded-xl"
                                    >
                                        {enrollLoading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Processing...
                                            </span>
                                        ) : "Enroll Now"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;

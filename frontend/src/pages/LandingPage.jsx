import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../services/courseService';
import CourseCard from '../components/CourseCard';
import { ArrowRight, BookOpen, Star, TrendingUp } from 'lucide-react';

const LandingPage = () => {
    const [featuredCourses, setFeaturedCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await courseService.getCourses();
                setFeaturedCourses(data.slice(0, 3)); // Show top 3
            } catch (error) {
                console.error("Failed to fetch featured courses", error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-20 lg:py-32 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                    <div className="absolute top-48 -left-24 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                </div>
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
                        Master New Skills <br className="hidden md:block"/> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Faster Than Ever</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join SkillNest to access premium courses, build your portfolio, and accelerate your career with expert-led instruction.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/courses" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
                            Explore Courses <ArrowRight size={20} />
                        </Link>
                        
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="text-center p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-gray-50">
                            <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                                <BookOpen size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Curriculum</h3>
                            <p className="text-gray-600">Learn from industry experts with courses designed for real-world application.</p>
                        </div>
                        <div className="text-center p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-gray-50">
                            <div className="w-16 h-16 mx-auto bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
                                <TrendingUp size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Learn at your Pace</h3>
                            <p className="text-gray-600">Access course materials anytime, anywhere, and progress as your schedule allows.</p>
                        </div>
                        <div className="text-center p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-gray-50">
                            <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                <Star size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Earn Certificates</h3>
                            <p className="text-gray-600">Demonstrate your new skills with verifiable certificates upon completion.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Courses */}
            <section className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 border-b border-gray-200 pb-8">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Featured Courses</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our most popular programs and start your learning journey today.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {featuredCourses.length > 0 ? featuredCourses.map(course => (
                            <CourseCard key={course._id} course={course} />
                        )) : (
                            <div className="col-span-1 md:col-span-3 text-center py-20 flex flex-col items-center">
                                <div className="animate-spin w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full mb-4"></div>
                                <p className="text-gray-500 font-medium text-lg">Loading amazing courses...</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="text-center">
                        <Link to="/courses" className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-blue-600 font-bold hover:text-blue-700 hover:bg-gray-50 text-lg px-8 py-3 rounded-full transition-all shadow-sm">
                            View All Courses <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;

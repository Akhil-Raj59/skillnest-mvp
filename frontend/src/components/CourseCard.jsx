import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const CourseCard = ({ course, isEnrolled, onEnroll }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 overflow-hidden group">
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                    src={course.image || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80'} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-900 font-bold px-3 py-1 rounded-full text-sm shadow-sm">
                    ${course.price}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">{course.category}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors">{course.title}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">{course.description}</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500 font-medium bg-gray-50 px-3 py-1.5 rounded-lg">
                        <span className="mr-1">⏱</span> {course.duration}
                    </div>
                    <div className="flex gap-2">
                        <Link to={`/courses/${course._id}`} className="text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium px-4 py-2 rounded-lg transition-colors">
                            Details
                        </Link>
                        {isEnrolled ? (
                            <span className="text-sm text-green-700 font-medium px-4 py-2 bg-green-50 border border-green-100 rounded-lg flex items-center gap-1">
                                ✓ Enrolled
                            </span>
                        ) : onEnroll ? (
                            <button 
                                onClick={() => onEnroll(course._id)} 
                                className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                Enroll Now
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;

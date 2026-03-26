import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Presentation, PlusCircle } from 'lucide-react';

const Sidebar = ({ role }) => {
    const adminLinks = [
        { path: '/admin/dashboard', icon: <Presentation size={20}/>, label: 'Overview' },
        { path: '/admin/courses', icon: <BookOpen size={20}/>, label: 'Manage Courses' },
        { path: '/admin/courses/add', icon: <PlusCircle size={20}/>, label: 'Add Course' },
    ];

    const userLinks = [
        { path: '/dashboard', icon: <Presentation size={20}/>, label: 'Dashboard Home' },
        { path: '/dashboard/my-courses', icon: <BookOpen size={20}/>, label: 'Enrolled Courses' },
    ];

    const links = role === 'admin' ? adminLinks : userLinks;

    return (
        <aside className="w-64 bg-white shadow-sm border-r border-gray-100 hidden md:flex flex-col h-[calc(100vh-4rem)] sticky top-16">
            <div className="p-6">
                <h2 className="text-xs uppercase font-extrabold text-gray-400 tracking-wider mb-5">
                    {role === 'admin' ? 'Admin Portal' : 'Student Portal'}
                </h2>
                <nav className="space-y-1.5">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path.endsWith('courses') || link.path.endsWith('dashboard') ? true : false}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                    isActive 
                                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                                }`
                            }
                        >
                            <span className={({isActive}) => isActive ? "opacity-100" : "opacity-75"}>{link.icon}</span>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;

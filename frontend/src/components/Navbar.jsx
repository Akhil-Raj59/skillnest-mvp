import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, User, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setMobileMenuOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-extrabold text-gray-900 flex items-center gap-2 tracking-tight group">
                        <span className="bg-blue-600 text-white px-2.5 py-1 rounded-xl group-hover:bg-blue-700 transition-colors shadow-sm">SN</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">SkillNest</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex flex-grow justify-center space-x-8 items-center">
                        <Link 
                            to="/courses" 
                            className={`px-3 py-2 rounded-lg font-semibold transition-colors ${isActive('/courses') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
                        >
                            Browse Courses
                        </Link>
                    </div>

                    {/* Desktop Right Side Auth */}
                    <div className="hidden md:flex items-center space-x-3 gap-2">
                        {user ? (
                            <>
                                <Link 
                                    to={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"} 
                                    className="text-gray-700 hover:text-blue-700 font-semibold flex items-center gap-2 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200"
                                >
                                    <LayoutDashboard size={18} className={user.role === 'admin' ? 'text-purple-500' : 'text-blue-500'} /> Dashboard
                                </Link>
                                <div className="h-6 w-px bg-gray-200 mx-2"></div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-gray-100 border border-gray-200 text-gray-700 p-2 rounded-full shadow-sm">
                                        <User size={16} />
                                    </div>
                                </div>
                                <button 
                                    onClick={handleLogout} 
                                    className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50 border border-transparent flex items-center gap-1 font-medium"
                                    title="Sign Out"
                                >
                                    <LogOut size={18} />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 font-semibold hover:text-gray-900 transition-colors px-4 py-2">Sign in</Link>
                                <Link to="/register" className="bg-gray-900 hover:bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 p-2">
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 shadow-lg absolute w-full left-0 origin-top animate-fade-in-down">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50">Browse Courses</Link>
                        {user ? (
                            <>
                                <Link to={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50">Dashboard</Link>
                                <button onClick={handleLogout} className="w-full text-left block px-3 py-3 rounded-md text-base font-semibold text-red-600 hover:bg-red-50">Sign Out</button>
                            </>
                        ) : (
                            <div className="pt-4 flex flex-col gap-3">
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center border border-gray-300 px-4 py-2.5 rounded-lg font-semibold text-gray-700">Sign in</Link>
                                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center bg-blue-600 px-4 py-2.5 rounded-lg font-semibold text-white">Get Started</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

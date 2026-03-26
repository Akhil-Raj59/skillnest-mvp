import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CourseListingPage from './pages/CourseListingPage';
import CourseDetailPage from './pages/CourseDetailPage';
import UserDashboard from './pages/UserDashboard';
import MyCoursesPage from './pages/MyCoursesPage';
import AdminDashboard from './pages/AdminDashboard';
import ManageCourses from './pages/ManageCourses';
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';

const App = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50">
            <Navbar />
            
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/courses" element={<CourseListingPage />} />
                <Route path="/courses/:id" element={<CourseDetailPage />} />

                {/* User Dashboard Routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
                            <Sidebar role="user" />
                            <main className="flex-1 overflow-auto bg-gray-50/50 w-full"><UserDashboard /></main>
                        </div>
                    </ProtectedRoute>
                } />
                <Route path="/dashboard/my-courses" element={
                    <ProtectedRoute>
                        <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
                            <Sidebar role="user" />
                            <main className="flex-1 overflow-auto bg-gray-50/50 w-full"><MyCoursesPage /></main>
                        </div>
                    </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={
                    <ProtectedRoute adminOnly={true}>
                        <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
                            <Sidebar role="admin" />
                            <main className="flex-1 overflow-auto bg-gray-50/50 w-full"><AdminDashboard /></main>
                        </div>
                    </ProtectedRoute>
                } />
                <Route path="/admin/courses" element={
                    <ProtectedRoute adminOnly={true}>
                        <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
                            <Sidebar role="admin" />
                            <main className="flex-1 overflow-auto bg-gray-50/50 w-full"><ManageCourses /></main>
                        </div>
                    </ProtectedRoute>
                } />
                <Route path="/admin/courses/add" element={
                    <ProtectedRoute adminOnly={true}>
                        <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
                            <Sidebar role="admin" />
                            <main className="flex-1 overflow-auto bg-gray-50/50 w-full"><AddCourse /></main>
                        </div>
                    </ProtectedRoute>
                } />
                <Route path="/admin/courses/edit/:id" element={
                    <ProtectedRoute adminOnly={true}>
                        <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
                            <Sidebar role="admin" />
                            <main className="flex-1 overflow-auto bg-gray-50/50 w-full"><EditCourse /></main>
                        </div>
                    </ProtectedRoute>
                } />

                {/* Catch All 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <Footer />
        </div>
    );
};

export default App;

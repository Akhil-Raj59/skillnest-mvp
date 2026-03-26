import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseService } from '../services/courseService';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AddCourse = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        duration: '',
        price: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await courseService.createCourse(formData);
            navigate('/admin/courses');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create course');
            setLoading(false);
        }
    };

    return (
        <div className="p-6 md:p-10 max-w-4xl mx-auto">
            <Link to="/admin/courses" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium mb-6 transition-colors w-max">
                <ChevronLeft size={20} /> Back to Manage Courses
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900">Add New Course</h1>
                <p className="text-gray-600 mt-2">Create a new course offering for students.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <InputField label="Course Title" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Advanced Full-Stack Web Development" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Course Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Describe what students will learn..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-900"
                            ></textarea>
                        </div>
                        <InputField label="Category" name="category" value={formData.category} onChange={handleChange} required placeholder="e.g. Web Development, Data Science" />
                        <InputField label="Duration" name="duration" value={formData.duration} onChange={handleChange} required placeholder="e.g. 8 Weeks, 40 Hours" />
                        <InputField label="Price ($)" type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="e.g. 49.99" />
                        <InputField label="Image URL" name="image" value={formData.image} onChange={handleChange} placeholder="https://unsplash.com/photos/..." />
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                        <Button type="button" onClick={() => navigate('/admin/courses')} variant="secondary" className="px-6 py-2.5 rounded-xl">Cancel</Button>
                        <Button type="submit" variant="primary" className="px-8 py-2.5 rounded-xl" disabled={loading}>
                            {loading ? "Creating..." : "Create Course"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCourse;

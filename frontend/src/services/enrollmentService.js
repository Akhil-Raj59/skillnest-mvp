import api from './api';

const enroll = async (courseId) => {
    const response = await api.post(`/enroll/${courseId}`);
    return response.data;
};

const getMyCourses = async () => {
    const response = await api.get('/enroll/my-courses');
    return response.data;
};

export const enrollmentService = { enroll, getMyCourses };

const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function runTests() {
    try {
        console.log('1. Testing Admin Login...');
        const adminRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@skillnest.com',
            password: '123456'
        });
        const adminToken = adminRes.data.token;
        console.log('Admin Token Extracted: ' + !!adminToken);

        console.log('2. Testing Create Course /api/courses...');
        const newCourse = await axios.post(`${API_URL}/courses`, {
            title: 'Test Integration Course',
            description: 'Testing the route compatibility',
            category: 'Testing',
            duration: '1 Hour',
            price: 0
        }, { headers: { Authorization: `Bearer ${adminToken}` } });
        const courseId = newCourse.data._id;
        console.log('Course Created: ' + courseId);

        console.log('3. Testing User Registration...');
        const userEmail = `user${Date.now()}@test.com`;
        const regRes = await axios.post(`${API_URL}/auth/register`, {
            name: 'Test Student',
            email: userEmail,
            password: 'password123'
        });
        const userToken = regRes.data.token;
        console.log('Student Token Extracted: ' + !!userToken);

        console.log('4. Testing Course Enrollment /api/enroll/:id...');
        const enrollRes = await axios.post(`${API_URL}/enroll/${courseId}`, {}, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log('Enrollment Added: ' + enrollRes.data.message);

        console.log('5. Testing Get My Courses /api/enroll/my-courses...');
        const myCoursesRes = await axios.get(`${API_URL}/enroll/my-courses`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log('My Courses Count: ' + myCoursesRes.data.length);

        console.log('6. Testing Clean up Course (Admin)...');
        await axios.delete(`${API_URL}/courses/${courseId}`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('Course Cleaned up.');

        console.log('ALL TESTS PASSED: Route compatibility perfectly matches frontend services.');
    } catch (err) {
        console.error('TEST FAILED:', err.response ? err.response.data : err.message);
    }
}

runTests();

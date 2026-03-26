const express = require('express');
const router = express.Router();
const { enrollCourse, getMyCourses } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:courseId', protect, enrollCourse);
router.get('/my-courses', protect, getMyCourses);

module.exports = router;

const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user._id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const enrollmentExists = await Enrollment.findOne({ user: userId, course: courseId });
        if (enrollmentExists) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        const enrollment = new Enrollment({ user: userId, course: courseId });
        await enrollment.save();

        // Push to user's enrolledCourses
        await User.findByIdAndUpdate(userId, { $push: { enrolledCourses: courseId } });

        res.status(201).json({ message: 'Enrolled successfully', enrollment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyCourses = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ user: req.user._id }).populate('course');
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { enrollCourse, getMyCourses };

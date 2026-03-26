const dotenv = require('dotenv');
// Load env vars
dotenv.config({ path: __dirname + '/.env' });
console.log("URI Loaded:", process.env.MONGODB_URI);

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/enroll', require('./routes/enrollmentRoutes'));

// Error Middlewares
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

// Seed Admin Function
const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ email: 'admin@skillnest.com' });
        if (!adminExists) {
            const admin = new User({
                name: 'Admin',
                email: 'admin@skillnest.com',
                password: 'password', // will be hashed by pre-save
                role: 'admin'
            });
            // Bypass the pre-save if we hash here, or let pre-save handle it
            // Pre save handles this if we just set password. Wait, password is '123456' per requirements.
            admin.password = '123456';
            await admin.save();
            console.log('Admin user seeded!');
        }
    } catch (error) {
        console.error('Error seeding admin', error);
    }
};
seedAdmin();

app.get('/', (req, res) => {
    res.send('SkillNest API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

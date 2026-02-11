const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
let isConnected = false; // Track connection status

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing MongoDB connection');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        isConnected = db.connections[0].readyState;
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        // Do not exit process in serverless; just log error
    }
};

// Connect to DB for every request (cached if already connected)
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

// Export the app for Vercel
module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

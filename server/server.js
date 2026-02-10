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
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        // process.exit(1); // Keep running even if DB fails for now (local test)
    }
};

connectDB();

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

// Export the app for Vercel
module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

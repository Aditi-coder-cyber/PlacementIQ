// IMPORTANT: env.js MUST be the very first import.
// It runs dotenv.config() so all process.env values are available
// before passport.js (or any other config) is loaded.
import './config/env.js';

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import passport from './config/passport.js';
import dsaRoutes from './routes/dsaRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/dsa', dsaRoutes);
app.use('/subjects', subjectRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('PlacementIQ Backend API is running...');
});

// Handle port in use gracefully
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Kill the process and restart.`);
        process.exit(1);
    }
});

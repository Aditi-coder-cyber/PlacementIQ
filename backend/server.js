import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import dsaRoutes from './routes/dsaRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
dotenv.config();

// Connect to MongoDB
connectDB();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/dsa', dsaRoutes);
app.use('/subjects', subjectRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('PlacementIQ Backend API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

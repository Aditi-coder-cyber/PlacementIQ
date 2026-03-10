import express from 'express';
import cors from 'cors';
import dsaRoutes from './routes/dsaRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/dsa', dsaRoutes);
app.use('/subjects', subjectRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('PlacementIQ Backend API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

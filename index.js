import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import settingsRoutes from './routes/settingsRoute.js';
import connectDB from './utils/connectDB.js';

const app = express();
dotenv.config();

connectDB();

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/settings', settingsRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

app.get((req, res) => {
    res.status(200).json({ message: 'You dont have access to this!!!' });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

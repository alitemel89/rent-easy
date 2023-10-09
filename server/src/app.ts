// src/app.ts

import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
// import authRoutes from './routes/authRoutes';
import './config/database';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// Routes
// app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

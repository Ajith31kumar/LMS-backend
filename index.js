import dotenv from 'dotenv';
dotenv.config();  // Load environment variables

import express from 'express';
import cors from 'cors';
import connectDB from './src/db/index.js';
import { app } from './src/app.js';  // Ensure app is properly exported

// Middleware setup
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Import and use routes
import StudentRoute from './src/routes/StudentRoute.js';
app.use('/students', StudentRoute);

import TeacherRoute from './src/routes/TeacherRoute.js';
app.use('/teachers', TeacherRoute);

import CourseRoute from './src/routes/CourseRoute.js';
app.use('/courses', CourseRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Database connection and server start
connectDB()
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MONGO DB ERROR: !!!", err);
  });

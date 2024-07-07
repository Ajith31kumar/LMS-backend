import dotenv from 'dotenv';
dotenv.config();  // Load environment variables

import connectDB from './src/db/index.js';
import express from 'express';
import cors from 'cors';
import { app } from './src/app.js'; // Ensure app is properly exported

// Database connection
connectDB()
.then(() => {
  // Start server
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running at port ${process.env.PORT || 5000}`);
  });
})
.catch((err) => {
  console.log("MONGO DB ERROR: !!!", err);
});

// Middleware setup
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Welcome message middleware
// app.use('/', (req, res) => {
//   res.send(`Welcome to the LMS!`);
// });

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

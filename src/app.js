import express from 'express';
import cors from 'cors';

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

export { app };

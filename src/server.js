import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(logger);

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world!' });
});

app.get('/notes', (req, res) => {
  res.json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
  const noteId = req.params.noteId;

  res.json({ message: `Retrieved note with ID: ${noteId}` });
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use((req, res) => {
  notFoundHandler(req, res);
});

app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

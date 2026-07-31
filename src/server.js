import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import dns from 'node:dns';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';

dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(cookieParser());

app.use(authRouter);
app.use(notesRouter);
app.use(userRouter);

// 404
app.use(notFoundHandler);

// celebrate
app.use(errors());

// 500
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

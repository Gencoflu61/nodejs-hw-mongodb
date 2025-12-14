import express from 'express';
import pinoHttp from 'pino-http';
import logger from './logger.js';
import cors from "cors";
import cookieParser from 'cookie-parser';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const setupServer = () => {
  const app = express();

  app.use(pinoHttp({ logger }));
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  }));
  app.use(express.json());
  app.use(cookieParser());

  
  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);

  
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default setupServer;
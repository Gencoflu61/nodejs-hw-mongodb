import express from 'express';
import pinoHttp from 'pino-http';
import logger from './logger.js';
import cors from "cors";
import cookieParser from 'cookie-parser';

// ✅✅✅ BU İKİ ROUTER IMPORT'U KESİNLİKLE OLMALI:
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js'; // BU SATIR EKLENDİ Mİ?

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const setupServer = () => {
  const app = express();

  app.use(pinoHttp({ logger }));
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // ✅✅✅ BU İKİ SATIR KESİNLİKLE OLMALI:
  app.use('/auth', authRouter);      // 1. /auth rotaları
  app.use('/contacts', contactsRouter); // 2. /contacts rotaları

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default setupServer;
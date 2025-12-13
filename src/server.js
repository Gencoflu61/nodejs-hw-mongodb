import express from 'express';
import pinoHttp from 'pino-http';
import logger from './logger.js';
import cors from "cors";
import { getAllContactsController, getContactByIdController } from  "./controllers/contacts.js";

const setupServer = () => {
  const app = express();

  app.use(pinoHttp({ logger }));
  app.use(cors());
  app.use(express.json());

  app.get('/contacts', getAllContactsController);
  app.get('/contacts/:contactId', getContactByIdController);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

 
  app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
  });

  return app;
};

export default setupServer;
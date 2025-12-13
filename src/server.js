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

  // Debug endpoint - MongoDB bilgilerini göster
  app.get('/debug', async (req, res) => {
    try {
      const mongoose = (await import('mongoose')).default;
      const db = mongoose.connection.db;
      const collections = await db.listCollections().toArray();
      const collectionNames = collections.map(c => c.name);
      
      // Her collection'daki doküman sayısını al
      const collectionInfo = await Promise.all(
        collectionNames.map(async (name) => {
          const count = await db.collection(name).countDocuments();
          return { name, count };
        })
      );
      
      res.json({
        database: db.databaseName,
        collections: collectionInfo,
        connectionState: mongoose.connection.readyState,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

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
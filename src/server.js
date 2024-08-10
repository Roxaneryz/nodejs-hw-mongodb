import express from 'express';
import cors from "cors";
import pino from "pino";
import pinoHttp from 'pino-http';
import {getContacts, getContactById} from "./controllers/contactsContrl.js";


export const setupServer = () => {
  const app = express(); // Створення серверу

  const logger = pino(); // Налаштування логгера pino
  app.use(pinoHttp({ logger }));

  app.use(cors()); // Налаштування CORS

  app.get('/contacts', getContacts);

  app.get('/contacts/:contactId', getContactById);

  // Обробка неіснуючих роутів
  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000; // Визначення порта

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`); // Запуск серверу
  });
};




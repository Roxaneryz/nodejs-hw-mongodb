import express from 'express';
import cors from "cors";
import pino from "pino";
// import pinoHttp from 'pino-http';
import router from "./routes/contactsRoute.js";
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter  from './routes/auth.js';
import cookieParser from 'cookie-parser';
import { authenticate } from './middlewares/auth.js';


export const setupServer = () => {
  const app = express(); // Створення серверу

  app.use(cookieParser());

  const logger = pino(); // Налаштування логгера pino
  // app.use(pinoHttp({ logger }));

  app.use(cors()); // Налаштування CORS
  app.use(express.json());
  // app.use(router);


  app.use("/auth", authRouter);

  app.use("/", authenticate, router);

  // Обробка неіснуючих роутів

  app.use("*", notFoundHandler);

  app.use(errorHandler);

  const PORT = process.env.PORT || 3000; // Визначення порта

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`); // Запуск серверу
  });
};




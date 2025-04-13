import express from 'express';
import pino from 'pino-http';
// eslint-disable-next-line no-unused-vars
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHanler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import contactsRouter from './routes/contacts.js';
export const setupServer = () => {
  const app = express();

  const PORT = Number(getEnvVar('PORT', 3000));

  // app.use(cors());
  // app.use(express.json());

  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );

  app.use(contactsRouter);
  app.use(notFoundHandler);

  app.use(errorHanler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

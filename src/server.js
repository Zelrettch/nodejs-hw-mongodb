import express from 'express';
import pino from 'pino-http';
// eslint-disable-next-line no-unused-vars
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';

export const startServer = () => {
  const app = express();

  const PORT = Number(getEnvVar('PORT', 3000));

  // app.use(cors());
  // app.use(express.json());

  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'HelloWorld',
    });
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

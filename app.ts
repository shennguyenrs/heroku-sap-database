import express from 'express';
import cors from 'cors';

import appRouter from './controllers/appRouter';
import postRouter from './controllers/postRouter';

import logger from './utils/logger';
import client from './utils/databaseClient';
import middleware from './utils/middleware';

const app: express.Application = express();

logger.info('Connecting to database...');

client.connect((err: Error) => {
  if (err) {
    logger.error('Failed to connect database: ' + err.message);
    process.exit(1);
  }

  logger.info('Connect to database successfully');
});

app.use(express.json());
app.use(cors());
app.use(middleware.reqLogger);

app.use(express.static('build'));

app.use('/api', appRouter);
app.use('/post', postRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;

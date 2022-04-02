import morgan, { StreamOptions } from 'morgan';
import { Request, Response, NextFunction } from 'express';

import logger from './logger';

const stream: StreamOptions = {
  write: (message) =>
    logger.http(message.substring(0, message.lastIndexOf('\n'))),
};

morgan.token('content', (req: Request, _res) => {
  return JSON.stringify(req.body);
});

const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Unknown Endpoint' });
};

const reqLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :content',
  { stream }
);

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);
  res.status(400).json({ error: err.message });
  next(err);
};

export = { unknownEndpoint, reqLogger, errorHandler };

import { Router, Request, Response, NextFunction } from 'express';
import axios from 'axios';

import getData from '../utils/getFromApi';

// Config
import { BASE_API } from '../utils/config';

// Logger
import logger from '../utils/logger';

import { WeatherPath } from '../models';

const postRouter = Router();

postRouter.get(
  '/weather/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (id !== WeatherPath.CURRENT && id !== WeatherPath.FORECAST) {
      next(new Error('Invalid path'));
      return res.status(400).end();
    }

    const path = req.path;
    const postData =
      id === WeatherPath.CURRENT
        ? await getData.weather(WeatherPath.CURRENT)
        : await getData.weather(WeatherPath.FORECAST);

    await axios
      .post(`${BASE_API}${path}`, postData)
      .then(() => {
        return res.status(200).end();
      })
      .catch((err: Error) => {
        logger.error('Error to post weather to database: ' + err.message);
        return res.status(500).end();
      });
  }
);

postRouter.get('/stations', async (req: Request, res: Response) => {
  const path = req.path;
  const postData = await getData.stations();

  await axios
    .post(`${BASE_API}${path}`, postData)
    .then(() => {
      return res.status(200).end();
    })
    .catch((err: Error) => {
      logger.error('Error to post stations status to database: ' + err.message);
      return res.status(500).end();
    });
});

export = postRouter;

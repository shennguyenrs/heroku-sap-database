import { Router, Request, Response, NextFunction } from 'express';

// Constants
import { currentTable, forecastTable, stationTable } from '../utils/config';

import { StationData, WeatherData, WeatherPath } from '../models';

import client from '../utils/databaseClient';

const appRouter = Router();

// GET method
appRouter.get(
  '/weather/:id',
  (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (id !== WeatherPath.CURRENT && id !== WeatherPath.FORECAST) {
      next(new Error('Invaild path'));
      return res.status(400).end();
    }

    const orderBy =
      id === WeatherPath.CURRENT ? 'last_updated' : 'forecast_time';
    const queryTable =
      id === WeatherPath.CURRENT ? currentTable : forecastTable;
    const getAll = `SELECT * FROM ${queryTable} ORDER BY ${orderBy} DESC;`;

    client.query(getAll, (err: Error, result) => {
      if (err) next(err);
      return res.status(200).json(result.rows);
    });
  }
);

appRouter.get(
  '/stations',
  (_req: Request, res: Response, next: NextFunction) => {
    const orderBy = 'last_reported';
    const getAll = `SELECT * FROM ${stationTable} ORDER BY ${orderBy} DESC;`;

    client.query(getAll, (err: Error, result) => {
      if (err) next(err);
      return res.status(200).json(result.rows);
    });
  }
);

// POST method
appRouter.post(
  '/weather/:id',
  (req: Request, res: Response, next: NextFunction) => {
    const data: WeatherData = req.body;

    const id = req.params.id;

    if (id !== WeatherPath.CURRENT && id !== WeatherPath.FORECAST) {
      next(new Error('Invalid path'));
      return res.status(400).end();
    }

    const queryTable =
      id === WeatherPath.CURRENT ? currentTable : forecastTable;

    // Query statement
    const addNew = `INSERT INTO ${queryTable} VALUES (${data.timestamp}, ${data.temp}, ${data.pressure}, ${data.humid}, ${data.windSpeed}, ${data.cloud});`;

    client.query(addNew, (err: Error) => {
      if (err) next(err);
      return res.status(200).end();
    });
  }
);

appRouter.post(
  '/stations',
  (req: Request, res: Response, next: NextFunction) => {
    const data: StationData[] = req.body;

    const insertedValues = data
      .map((item) => '(' + Object.values(item).join(', ') + ')')
      .join(', ');

    //Query statement
    const addNew = `INSERT INTO ${stationTable} VALUES ` + insertedValues + ';';

    client.query(addNew, (err: Error) => {
      if (err) next(err);
      return res.status(200).end();
    });
  }
);

export = appRouter;

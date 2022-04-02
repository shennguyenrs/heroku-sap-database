import axios from 'axios';

// Interface
import { WeatherData, StationData, WeatherPath } from '../models';

// Config
import {
  CURRENT_WEATHER_URL,
  FORECAST_WEATHER_URL,
  STATION_URL,
} from '../utils/config';

// Logger
import logger from './logger';

const getWeatherFromAPI = async (path: WeatherPath) => {
  let weatherData: WeatherData | undefined = undefined;

  await axios
    .get(
      path === WeatherPath.CURRENT
        ? (CURRENT_WEATHER_URL as string)
        : (FORECAST_WEATHER_URL as string)
    )
    .then(({ data }) => {
      const finalRes = path === WeatherPath.CURRENT ? data : data.list[10];

      weatherData = {
        timestamp: finalRes.dt,
        temp: finalRes.main.temp,
        pressure: finalRes.main.pressure,
        humid: finalRes.main.humidity,
        windSpeed: finalRes.wind.speed,
        cloud: finalRes.clouds.all,
      };
    })
    .catch((err: Error) => {
      logger.error('Failed to get weather from API: ' + err.message);
    });

  return weatherData;
};

const getStationFromAPI = async () => {
  const stations: StationData[] = [];

  await axios
    .get(STATION_URL as string)
    .then(({ data }) => {
      const raw = data.data.stations;

      raw.forEach((item: any) => {
        stations.push({
          stationId: item.station_id,
          numBikeAvai: item.num_bikes_available,
          numBikeDis: item.num_bikes_disabled,
          numDockAvai: item.num_docks_available,
          numDockDis: item.num_docks_disabled,
          isInstalled: item.is_installed,
          isRenting: item.is_renting,
          isReturning: item.is_returning,
          lastReported: item.last_reported,
        });
      });
    })
    .catch((err: Error) => {
      logger.error('Error when get data from api: ' + err.message);
    });

  return stations;
};

export = { weather: getWeatherFromAPI, stations: getStationFromAPI };

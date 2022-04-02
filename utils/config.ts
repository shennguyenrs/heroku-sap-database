require('dotenv').config();

export const PORT = process.env.PORT || 3001;
export const BASE_API = `http://localhost:${PORT}/api`;

export const CURRENT_WEATHER_URL = process.env.CURRENT_WEATHER_URL;
export const FORECAST_WEATHER_URL = process.env.FORECAST_WEATHER_URL;
export const STATION_URL = process.env.STATION_URL;
export const DATABASE_URL = process.env.DATABASE_URL;

// Constants
export const currentTable = 'current_weather';
export const forecastTable = 'forecast_weather';
export const stationTable = 'station_status';

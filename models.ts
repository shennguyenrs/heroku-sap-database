export interface WeatherData {
  timestamp: number;
  temp: number;
  pressure: number;
  humid: number;
  windSpeed: number;
  cloud: number;
}

export interface StationData {
  stationId: string;
  numBikeAvai: number;
  numBikeDis: number;
  numDockAvai: number;
  numDockDis: number;
  isInstalled: number;
  isRenting: number;
  isReturning: number;
  lastReported: number;
}

export enum WeatherPath {
  CURRENT = 'current',
  FORECAST = 'forecast',
}

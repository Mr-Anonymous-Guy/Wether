export type WeatherCondition =
  | "sunny"
  | "cloudy"
  | "rainy"
  | "storm"
  | "snow"
  | "fog";

export interface WeatherData {
  city: string;
  country?: string;
  temperature: number;
  condition: WeatherCondition;
  conditionLabel: string;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  sunrise: string;
  sunset: string;
  isDay: boolean;
  time: Date;
  weatherCode: number;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  name: string;
  country?: string;
}
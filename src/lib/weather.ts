import type { WeatherCondition, WeatherData, GeoLocation } from "@/types/weather";

export function mapWeatherCode(code: number): { condition: WeatherCondition; label: string } {
  if (code === 0) return { condition: "sunny", label: "Clear sky" };
  if (code === 1) return { condition: "sunny", label: "Mainly clear" };
  if (code === 2) return { condition: "cloudy", label: "Partly cloudy" };
  if (code === 3) return { condition: "cloudy", label: "Overcast" };
  if (code === 45 || code === 48) return { condition: "fog", label: "Fog" };
  if (code >= 51 && code <= 57) return { condition: "rainy", label: "Drizzle" };
  if (code >= 61 && code <= 67) return { condition: "rainy", label: "Rain" };
  if (code >= 71 && code <= 77) return { condition: "snow", label: "Snowfall" };
  if (code >= 80 && code <= 82) return { condition: "rainy", label: "Rain showers" };
  if (code >= 85 && code <= 86) return { condition: "snow", label: "Snow showers" };
  if (code >= 95) return { condition: "storm", label: "Thunderstorm" };
  return { condition: "cloudy", label: "Cloudy" };
}

export async function searchCities(query: string): Promise<GeoLocation[]> {
  if (!query.trim()) return [];
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`,
  );
  const json = await res.json();
  if (!json.results) return [];
  return json.results.map((r: any) => ({
    latitude: r.latitude,
    longitude: r.longitude,
    name: r.name,
    country: r.country,
  }));
}

export async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&language=en&format=json`,
    );
    const json = await res.json();
    return json?.results?.[0]?.name ?? "Your Location";
  } catch {
    return "Your Location";
  }
}

export async function fetchWeather(loc: GeoLocation): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(loc.latitude),
    longitude: String(loc.longitude),
    current:
      "temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m,pressure_msl",
    daily: "temperature_2m_max,temperature_2m_min,sunrise,sunset",
    timezone: "auto",
  });
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error("Failed to fetch weather");
  const json = await res.json();
  const { condition, label } = mapWeatherCode(json.current.weather_code);
  return {
    city: loc.name,
    country: loc.country,
    temperature: Math.round(json.current.temperature_2m),
    condition,
    conditionLabel: label,
    minTemp: Math.round(json.daily.temperature_2m_min[0]),
    maxTemp: Math.round(json.daily.temperature_2m_max[0]),
    humidity: json.current.relative_humidity_2m,
    pressure: Math.round(json.current.pressure_msl),
    windSpeed: Number(json.current.wind_speed_10m.toFixed(2)),
    sunrise: formatTime(json.daily.sunrise[0]),
    sunset: formatTime(json.daily.sunset[0]),
    isDay: json.current.is_day === 1,
    time: new Date(),
    weatherCode: json.current.weather_code,
  };
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
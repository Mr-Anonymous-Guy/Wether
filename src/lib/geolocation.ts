import type { GeoLocation } from "@/types/weather";
import { reverseGeocode } from "./weather";

export function getCurrentLocation(): Promise<GeoLocation> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const name = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          name,
        });
      },
      (err) => reject(err),
      { timeout: 8000 },
    );
  });
}
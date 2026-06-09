import { motion } from "framer-motion";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudSun } from "lucide-react";
import type { WeatherCondition } from "@/types/weather";

interface Props {
  condition: WeatherCondition;
  isDay?: boolean;
  size?: number;
  className?: string;
}

export function WeatherIcon({ condition, isDay = true, size = 120, className = "" }: Props) {
  const Icon = (() => {
    switch (condition) {
      case "sunny":
        return isDay ? Sun : CloudSun;
      case "cloudy":
        return Cloud;
      case "rainy":
        return CloudRain;
      case "storm":
        return CloudLightning;
      case "snow":
        return CloudSnow;
      case "fog":
        return CloudFog;
    }
  })();

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon size={size} strokeWidth={1.2} className="text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]" />
      </motion.div>
    </motion.div>
  );
}
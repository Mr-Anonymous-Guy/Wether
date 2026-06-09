import { motion } from "framer-motion";
import { Droplets, Gauge, Wind, Sunrise, Sunset, ArrowDown, ArrowUp } from "lucide-react";
import type { WeatherData } from "@/types/weather";
import { WeatherIcon } from "./WeatherIcon";

interface Props {
  data: WeatherData;
}

function formatDay(d: Date) {
  return d.toLocaleDateString([], { weekday: "long" });
}
function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function WeatherCard({ data }: Props) {
  const rows: Array<{ icon: React.ReactNode; label: string; value: string }> = [
    { icon: <span className="font-medium">Weather</span>, label: "", value: data.conditionLabel },
    { icon: <ArrowDown size={14} />, label: "Min Temp", value: `${data.minTemp}°C` },
    { icon: <ArrowUp size={14} />, label: "Max Temp", value: `${data.maxTemp}°C` },
    { icon: <Gauge size={14} />, label: "Pressure", value: `${data.pressure} hPa` },
    { icon: <Droplets size={14} />, label: "Humidity", value: `${data.humidity}%` },
    { icon: <Wind size={14} />, label: "Wind Speed", value: `${data.windSpeed} m/s` },
    { icon: <Sunset size={14} />, label: "Sunset", value: data.sunset },
    { icon: <Sunrise size={14} />, label: "Sunrise", value: data.sunrise },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015, y: -4 }}
      className="glass-card relative w-full max-w-4xl overflow-hidden rounded-[30px] p-8 md:p-12 text-white"
    >
      {/* inner glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-gradient-to-br from-white/10 via-transparent to-transparent" />

      <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-12">
        {/* Left side */}
        <div className="flex flex-col">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-semibold tracking-tight drop-shadow-md"
          >
            {data.city}
          </motion.h1>

          <motion.div
            key={data.temperature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-3 flex items-start gap-1"
          >
            <span className="text-7xl md:text-9xl font-bold leading-none tracking-tighter drop-shadow-lg">
              {data.temperature}
            </span>
            <span className="mt-3 text-2xl md:text-3xl font-light opacity-90">°C</span>
          </motion.div>

          <p className="mt-2 text-sm md:text-base text-white/80">
            {formatDay(data.time)} • {formatTime(data.time)}
          </p>

          <div className="mt-auto pt-10">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <WeatherIcon condition={data.condition} isDay={data.isDay} size={140} />
            </motion.div>
          </div>
        </div>

        {/* Right side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel flex flex-col gap-3 rounded-3xl p-6 text-sm md:text-[15px]"
        >
          {rows.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.04 }}
              className="flex items-center justify-between border-b border-white/15 pb-2 last:border-0"
            >
              <span className="flex items-center gap-2 text-white/85">
                {r.icon}
                {r.label && <span>{r.label}</span>}
              </span>
              <span className="font-medium text-white">{r.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
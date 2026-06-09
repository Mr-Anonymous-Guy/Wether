import { motion, AnimatePresence } from "framer-motion";
import type { WeatherCondition } from "@/types/weather";

interface Props {
  condition: WeatherCondition;
  isDay: boolean;
}

function gradientFor(condition: WeatherCondition, isDay: boolean): string {
  if (!isDay) return "linear-gradient(135deg, #2b1b6b 0%, #4c1d95 45%, #1e1b4b 100%)";
  switch (condition) {
    case "sunny":
      return "linear-gradient(135deg, #ffb88c 0%, #ff8a65 50%, #f48fb1 100%)";
    case "cloudy":
    case "fog":
      return "linear-gradient(135deg, #a0b6c8 0%, #6f8aa8 60%, #4a6585 100%)";
    case "rainy":
      return "linear-gradient(135deg, #4a6a8a 0%, #2c4a6b 60%, #1a2f4a 100%)";
    case "storm":
      return "linear-gradient(135deg, #3a3a5e 0%, #1f1f3d 60%, #0d0d22 100%)";
    case "snow":
      return "linear-gradient(135deg, #e0eaf5 0%, #b8c9dc 60%, #8aa3c0 100%)";
    default:
      return "linear-gradient(135deg, #f8bbd0 0%, #ce93d8 50%, #b39ddb 100%)";
  }
}

export function BackgroundGradient({ condition, isDay }: Props) {
  const bg = gradientFor(condition, isDay);
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={bg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
          style={{ background: bg }}
        />
      </AnimatePresence>
      {/* soft floating orbs */}
      <motion.div
        className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent 70%)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-[34rem] w-[34rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5), transparent 70%)" }}
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
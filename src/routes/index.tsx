/**
 * src/routes/index.tsx
 * ─────────────────────────────────────────────────────────────
 * Homepage — Weather Cards
 *
 * Page-level SEO:
 *   ✓ Keyword-rich title / description
 *   ✓ Open Graph overrides (og:url, og:image)
 *   ✓ Twitter Card overrides
 *   ✓ Canonical URL
 *   ✓ Responsive logo + app name header
 * ─────────────────────────────────────────────────────────────
 */

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import { SearchBar } from "@/components/SearchBar";
import { WeatherCard } from "@/components/WeatherCard";
import { LoadingCard } from "@/components/LoadingCard";
import { fetchWeather } from "@/lib/weather";
import { getCurrentLocation } from "@/lib/geolocation";
import type { GeoLocation } from "@/types/weather";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_ALT,
  canonicalUrl,
} from "@/lib/seo";

// ── Route definition ─────────────────────────────────────────────
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      // Page-specific title (overrides root default)
      { title: `${SITE_NAME} | Live Weather Forecast & Real-Time Updates` },
      {
        name: "description",
        content:
          "Get real-time weather forecasts, temperature, humidity, wind speed, and 7-day outlooks for any city worldwide. Free, beautiful, and blazing-fast.",
      },

      // OG overrides for the homepage
      {
        property: "og:title",
        content: `${SITE_NAME} | Live Weather Forecast & Real-Time Updates`,
      },
      {
        property: "og:description",
        content: SITE_DESCRIPTION,
      },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}${OG_IMAGE}` },
      { property: "og:image:width", content: String(OG_IMAGE_WIDTH) },
      { property: "og:image:height", content: String(OG_IMAGE_HEIGHT) },
      { property: "og:image:alt", content: OG_IMAGE_ALT },

      // Twitter overrides
      {
        name: "twitter:title",
        content: `${SITE_NAME} | Live Weather Forecast & Real-Time Updates`,
      },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: `${SITE_URL}${OG_IMAGE}` },
    ],
    links: [
      // Canonical — prevents duplicate-URL penalties
      { rel: "canonical", href: canonicalUrl("/") },
    ],
  }),
  component: Index,
});

// ── Page component ───────────────────────────────────────────────
function Index() {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [geoDenied, setGeoDenied] = useState(false);

  useEffect(() => {
    getCurrentLocation()
      .then(setLocation)
      .catch(() => {
        setGeoDenied(true);
        // Fallback to Santiago so the app never shows empty state
        setLocation({ latitude: -33.4489, longitude: -70.6693, name: "Santiago", country: "Chile" });
      });
  }, []);

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["weather", location?.latitude, location?.longitude],
    queryFn: () => fetchWeather(location!),
    enabled: !!location,
    staleTime: 5 * 60 * 1000,    // 5 min client cache
    gcTime: 10 * 60 * 1000,      // 10 min garbage-collect
  });

  const condition = data?.condition ?? "sunny";
  const isDay = data?.isDay ?? true;

  return (
    <>
      <BackgroundGradient condition={condition} isDay={isDay} />

      <main
        id="main-content"
        className="relative flex min-h-screen flex-col items-center px-4 py-8 md:py-12"
        role="main"
      >
        {/* ── Navbar / Header ──────────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex w-full max-w-4xl items-center justify-between gap-4"
          role="banner"
        >
          {/* Logo + App Name */}
          <a
            href="/"
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg"
            aria-label={`${SITE_NAME} — Home`}
          >
            <img
              src="/images/logo.png"
              alt={`${SITE_NAME} Logo`}
              width={40}
              height={40}
              decoding="async"
              className="
                w-8 h-8 md:w-10 md:h-10
                rounded-xl object-cover
                shadow-lg ring-2 ring-white/20
                transition-transform duration-200 hover:scale-105
              "
            />
            <span
              className="font-display text-2xl md:text-3xl text-white drop-shadow-lg leading-none"
              style={{ fontFamily: "Caveat, cursive" }}
            >
              {SITE_NAME}
            </span>
          </a>

          {/* City search */}
          <SearchBar onSelect={(loc) => setLocation(loc)} />
        </motion.header>

        {/* Geo-denied notice */}
        {geoDenied && (
          <p
            role="status"
            aria-live="polite"
            className="mt-3 text-xs text-white/70"
          >
            Location access denied — search for a city above.
          </p>
        )}

        {/* ── Weather content ───────────────────────────────────── */}
        <section
          className="mt-10 flex w-full flex-1 items-center justify-center md:mt-16"
          aria-label="Weather forecast"
        >
          {isLoading || !data ? (
            isError ? (
              <ErrorCard onRetry={() => refetch()} />
            ) : (
              <LoadingCard />
            )
          ) : isError ? (
            <ErrorCard onRetry={() => refetch()} />
          ) : (
            <motion.div
              className="w-full flex justify-center"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <WeatherCard data={data} />
            </motion.div>
          )}
        </section>

        {/* Refresh button */}
        <button
          onClick={() => refetch()}
          aria-label="Refresh weather data"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs text-white backdrop-blur-md border border-white/20 hover:bg-white/25 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <RefreshCw size={12} className={isFetching ? "animate-spin" : ""} aria-hidden="true" />
          Refresh
        </button>
      </main>
    </>
  );
}

// ── Error card ────────────────────────────────────────────────────
function ErrorCard({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card max-w-md rounded-[30px] p-10 text-center text-white"
      role="alert"
    >
      <h2 className="text-xl font-semibold">Unable to fetch weather data.</h2>
      <p className="mt-2 text-sm text-white/80">Check your connection and try again.</p>
      <button
        onClick={onRetry}
        className="mt-6 rounded-full bg-white/20 px-5 py-2 text-sm font-medium hover:bg-white/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        Retry
      </button>
    </motion.div>
  );
}

/**
 * lib/seo.ts
 * ─────────────────────────────────────────────────────────────
 * Central SEO configuration for Weather Cards.
 * Import constants from here to keep every route consistent.
 * ─────────────────────────────────────────────────────────────
 */

// ── Site constants ─────────────────────────────────────────────
export const SITE_NAME = "Weather Cards";
export const SITE_SHORT_NAME = "WeatherCards";
export const SITE_DESCRIPTION =
  "Beautiful real-time weather forecasts powered by Open-Meteo with automatic location detection and city search.";
export const SITE_URL =
  typeof import.meta.env !== "undefined" && import.meta.env.VITE_SITE_URL
    ? (import.meta.env.VITE_SITE_URL as string)
    : "https://weather-cards.vercel.app";
export const SITE_LOCALE = "en_US";
export const SITE_AUTHOR = "Weather Cards";
export const SITE_THEME_COLOR = "#1e6bff";
export const SITE_BG_COLOR = "#0f172a";

// ── Primary keywords ────────────────────────────────────────────
export const PRIMARY_KEYWORDS = [
  "weather",
  "weather forecast",
  "current weather",
  "live weather",
  "local weather",
  "temperature",
  "hourly weather",
  "7 day forecast",
  "weather updates",
  "weather radar",
  "weather app",
];

// ── Long-tail keywords ──────────────────────────────────────────
export const LONG_TAIL_KEYWORDS = [
  "current weather in my location",
  "today weather forecast",
  "live weather updates near me",
  "temperature and humidity today",
  "weekly weather forecast free",
  "real-time weather tracker online",
  "beautiful weather app for desktop",
  "accurate local weather forecast",
];

// ── Question / Voice Search keywords ────────────────────────────
export const VOICE_KEYWORDS = [
  "what is the weather today",
  "is it going to rain today",
  "weather forecast for tomorrow",
  "what's the temperature right now",
  "show me the weather for the week",
];

// ── Semantic / LSI keywords ─────────────────────────────────────
export const LSI_KEYWORDS = [
  "meteorology",
  "climate",
  "precipitation",
  "atmospheric pressure",
  "wind speed",
  "UV index",
  "weather conditions",
  "cloud cover",
];

// ── Local Intent keywords ───────────────────────────────────────
export const LOCAL_KEYWORDS = [
  "weather near me",
  "local weather forecast",
  "my city weather",
  "current temperature outside",
];

export const ALL_KEYWORDS = [
  ...PRIMARY_KEYWORDS,
  ...LONG_TAIL_KEYWORDS,
  ...VOICE_KEYWORDS,
  ...LSI_KEYWORDS,
  ...LOCAL_KEYWORDS,
];

// ── SEO Descriptions ────────────────────────────────────────────
export const SITE_DESCRIPTION_SHORT = "Live weather forecasts with beautiful glassmorphism design.";
export const SITE_DESCRIPTION_LONG = "Weather Cards provides highly accurate, real-time weather forecasts powered by Open-Meteo. Enjoy a beautiful, lightning-fast weather dashboard featuring automatic location detection, detailed 7-day outlooks, and live atmospheric conditions.";
export const SITE_DESCRIPTION_APP_STORE = "Get the most beautiful and accurate weather forecasts with Weather Cards. Features include live temperature, wind speed, humidity, and a stunning dynamic glassmorphism interface that adapts to current conditions.";

// ── Image paths ─────────────────────────────────────────────────
export const OG_IMAGE = "/images/logo.png";
export const OG_IMAGE_WIDTH = 512;
export const OG_IMAGE_HEIGHT = 512;
export const OG_IMAGE_ALT = "Weather Cards — Beautiful weather forecasts";

// ── Verification tokens (set in .env) ──────────────────────────
export const GOOGLE_SITE_VERIFICATION =
  typeof import.meta.env !== "undefined"
    ? (import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined)
    : undefined;

export const BING_SITE_VERIFICATION =
  typeof import.meta.env !== "undefined"
    ? (import.meta.env.VITE_BING_SITE_VERIFICATION as string | undefined)
    : undefined;

// ── Title builder ───────────────────────────────────────────────
/**
 * Build a `<title>` string following the template pattern:
 *   "Weather Cards | Live Weather Forecast"  (default)
 *   "Santiago Weather | Weather Cards"       (with page title)
 */
export function buildTitle(pageTitle?: string): string {
  if (!pageTitle) return `${SITE_NAME} | Live Weather Forecast`;
  return `${pageTitle} | ${SITE_NAME}`;
}

// ── Canonical URL builder ───────────────────────────────────────
export function canonicalUrl(path = "/"): string {
  const base = SITE_URL.replace(/\/$/, "");
  const slug = path.startsWith("/") ? path : `/${path}`;
  return `${base}${slug}`;
}

// ── JSON-LD schemas ─────────────────────────────────────────────

/** WebSite schema — helps Google understand the site entity */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Organization schema */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}${OG_IMAGE}`,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
    },
    sameAs: [],
  };
}

/** WebApplication schema */
export function webApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: "WeatherApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Real-time weather forecasts",
      "Automatic location detection",
      "City search",
      "Temperature, humidity and wind speed",
      "7-day forecast",
      "Glassmorphism UI",
      "Mobile responsive",
    ],
    screenshot: {
      "@type": "ImageObject",
      url: `${SITE_URL}${OG_IMAGE}`,
    },
  };
}

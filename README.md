# Weather Cards

A glassmorphism weather application built with TanStack Start and React. It fetches real-time conditions from Open-Meteo's free API, resolves the user's position automatically via the browser Geolocation API, and renders live temperature, humidity, wind speed, pressure, sunrise, and sunset data inside an animated, condition-reactive UI.

---

## Features

| Feature | Description |
| --- | --- |
| Automatic location detection | Uses the browser Geolocation API to determine position on first load, with reverse geocoding via Open-Meteo |
| City search | Debounced typeahead backed by the Open-Meteo Geocoding API; returns up to six results with keyboard navigation |
| Real-time weather data | Current temperature, humidity, wind speed, and pressure fetched on every location change |
| Daily min / max temperature | Pulled from the Open-Meteo daily forecast endpoint |
| Sunrise and sunset times | Locale-formatted times derived from the daily forecast |
| Condition-reactive background | Animated full-screen gradient that transitions between six states: sunny, cloudy, rainy, storm, snow, and fog |
| Day / night awareness | Background and icon set change based on the `is_day` field returned by the API |
| Animated weather icons | Spring-animated Lucide icons that float continuously on the card |
| Shimmer loading skeleton | Full-card skeleton rendered while data is in flight |
| Glassmorphism card | `backdrop-filter` blur with layered gradients and an inner highlight ring |
| Responsive layout | Single-column on mobile, side-by-side grid on `md` and above |
| PWA ready | Web Manifest with `standalone` display and maskable icons |
| SEO optimised | Open Graph, Twitter Card, JSON-LD structured data, `robots.txt`, and XML sitemap |
| Google Search Console | Verification meta tag injected via environment variable |
| Bing Webmaster Tools | `msvalidate.01` meta tag injected via environment variable |

---

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | [TanStack Start](https://tanstack.com/start) |
| Routing | [TanStack Router](https://tanstack.com/router) |
| Data fetching | [TanStack Query](https://tanstack.com/query) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Weather API | [Open-Meteo](https://open-meteo.com) (no API key required) |
| Geocoding API | [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api) |
| Build tool | Vite 7 + Nitro |
| Package manager | npm |
| Deployment | Vercel |

---

## Project Structure

```text
src/
├── components/
│   ├── BackgroundGradient.tsx   # Condition-reactive animated background
│   ├── LoadingCard.tsx          # Shimmer skeleton displayed during fetch
│   ├── SearchBar.tsx            # Debounced city typeahead with keyboard nav
│   ├── StructuredData.tsx       # JSON-LD schema injection (WebSite, Org, App)
│   ├── WeatherCard.tsx          # Main card: temperature, stats, animated icon
│   └── WeatherIcon.tsx          # Animated Lucide icon mapped from condition
├── lib/
│   ├── config.server.ts         # Server-only env helpers (.server.ts suffix)
│   ├── geolocation.ts           # Browser Geolocation API wrapper
│   ├── seo.ts                   # SEO constants, keyword list, schema builders
│   └── weather.ts               # Open-Meteo fetch functions and WMO code mapper
├── routes/
│   ├── __root.tsx               # Root shell: global head, favicons, JSON-LD
│   └── index.tsx                # Homepage route
├── types/
│   └── weather.ts               # WeatherData, GeoLocation, WeatherCondition types
├── router.tsx                   # TanStack Router + QueryClient factory
├── server.ts                    # SSR entry: delegates to TanStack Start handler
├── start.ts                     # TanStack Start instance + error middleware
└── styles.css                   # Tailwind v4 theme, glass-card, shimmer utilities

public/
├── images/
│   ├── logo.png                 # Primary brand logo (512×512)
│   └── logo.svg                 # Scalable SVG variant
├── apple-touch-icon.png         # iOS home screen icon (180×180)
├── favicon.ico                  # Legacy browser favicon
├── favicon-16.png
├── favicon-32.png
├── robots.txt                   # Crawl directives and sitemap reference
├── site.webmanifest             # PWA manifest
└── sitemap.xml                  # XML sitemap with image extension metadata
```

---

## Getting Started

### Prerequisites

- Node.js 20+ or Bun 1.x
- No external API keys required (Open-Meteo is free and keyless)

### Installation

```bash
git clone https://github.com/Mr-Anonymous-Guy/Wether.git
cd Wether
npm install          # or: bun install
```

### Running locally

```bash
npm run dev
```

The development server starts on `http://localhost:8080`.

### Building for production

```bash
npm run build
```

Output is written to `.output/`. Preview the production build:

```bash
npm run preview
```

---

## Environment Variables

Copy `.env.template` to `.env` and fill in the values you need.

```bash
cp .env.template .env
```

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_KEY` | Optional | OpenWeatherMap key (not used by default; Open-Meteo is keyless) |
| `VITE_SITE_URL` | Recommended | Canonical domain used for OG images and sitemap, e.g. `https://weather-cards.vercel.app` |
| `VITE_GOOGLE_SITE_VERIFICATION` | Optional | Verification token from [Google Search Console](https://search.google.com/search-console) |
| `VITE_BING_SITE_VERIFICATION` | Optional | Verification token from [Bing Webmaster Tools](https://www.bing.com/webmasters) |

All variables are prefixed with `VITE_` and are exposed to the client bundle by Vite.

---

## Deployment

### Vercel

The project deploys to Vercel with zero additional configuration.
Nitro writes `.vercel/output/` at build time; Vercel detects it automatically.

```bash
npm install -g vercel
vercel --prod
```

Set environment variables in the Vercel dashboard under **Settings → Environment Variables**.

**Vercel project settings:**

| Setting | Value |
| --- | --- |
| Framework Preset | Other |
| Build Command | `npm run build` |
| Install Command | `npm install` |
| Output Directory | *(leave blank — Nitro writes `.vercel/output/` automatically)* |
| Node.js Version | 20.x |

---

## Live Preview

You can visit it live in [simplewether](https://simplewether.vercel.app) website.

---

## Performance

- **No external API keys**: Open-Meteo is called directly from the browser — no server proxy needed.
- **TanStack Query caching**: Weather responses are cached for 5 minutes client-side (`staleTime: 5 * 60 * 1000`) and garbage-collected after 10 minutes.
- **Debounced search**: The city search fires after a 250 ms debounce with in-flight request cancellation to avoid redundant network calls.
- **Preloaded logo**: The brand logo uses `rel="preload"` to reduce LCP on first paint.
- **Shimmer skeleton**: A CSS-only shimmer animation is shown immediately while data loads, preventing layout shift.
- **Framer Motion `AnimatePresence`**: Background crossfades are handled with opacity transitions, not repaints, keeping CLS near zero.

---

## Contributing

1. Fork the repository and create a feature branch from `main`.
2. Install dependencies with `npm install`.
3. Run `npm run dev` and confirm the dev server starts without errors.
4. Make your changes. Keep commits focused and atomic.
5. Run `npm run lint` before opening a pull request.
6. Open a pull request with a clear description of the change and why it is needed.

For significant changes, open an issue first to discuss the approach.

---

## License

MIT License. See [LICENSE](LICENSE) for full text.

---

## Author

Developed and maintained by [Mr-Anonymous-Guy](https://github.com/Mr-Anonymous-Guy)

Weather data provided by [Open-Meteo](https://open-meteo.com) under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license.

/**
 * src/routes/__root.tsx
 * ─────────────────────────────────────────────────────────────
 * TanStack Start root layout — equivalent to Next.js app/layout.tsx.
 *
 * SEO implemented here:
 *   ✓ Full meta/title/description
 *   ✓ Keyword meta tag
 *   ✓ Robots (index + follow, Googlebot directives)
 *   ✓ Open Graph (website, title, description, image, locale)
 *   ✓ Twitter Card (summary_large_image)
 *   ✓ Favicon suite (ico, 16, 32, 512, svg)
 *   ✓ Apple Touch Icon
 *   ✓ PWA Web Manifest
 *   ✓ Canonical URL
 *   ✓ Theme color + apple-mobile-web-app meta
 *   ✓ Google Search Console verification
 *   ✓ Bing Webmaster Tools verification
 *   ✓ Structured Data (JSON-LD) via <StructuredData />
 * ─────────────────────────────────────────────────────────────
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { StructuredData } from "@/components/StructuredData";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_LOCALE,
  SITE_THEME_COLOR,
  ALL_KEYWORDS,
  OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_ALT,
  GOOGLE_SITE_VERIFICATION,
  BING_SITE_VERIFICATION,
  canonicalUrl,
} from "@/lib/seo";

// ── 404 ─────────────────────────────────────────────────────────
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Error boundary ───────────────────────────────────────────────
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Root route ───────────────────────────────────────────────────
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    // Build optional verification meta tags only when tokens are set
    const verificationMeta: Array<Record<string, string>> = [];
    if (GOOGLE_SITE_VERIFICATION) {
      verificationMeta.push({
        name: "google-site-verification",
        content: GOOGLE_SITE_VERIFICATION,
      });
    }
    if (BING_SITE_VERIFICATION) {
      verificationMeta.push({
        name: "msvalidate.01",
        content: BING_SITE_VERIFICATION,
      });
    }

    return {
      meta: [
        // ── Core ────────────────────────────────────────────────
        { charSet: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
        },
        // Default title — individual routes override via their own head()
        { title: `${SITE_NAME} | Live Weather Forecast` },
        { name: "description", content: SITE_DESCRIPTION },
        { name: "keywords", content: ALL_KEYWORDS.join(", ") },
        { name: "author", content: SITE_NAME },
        { name: "creator", content: SITE_NAME },
        { name: "application-name", content: SITE_NAME },

        // ── Robots ──────────────────────────────────────────────
        { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
        { name: "googlebot", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
        { name: "bingbot", content: "index, follow" },

        // ── Theme / PWA ──────────────────────────────────────────
        { name: "theme-color", content: SITE_THEME_COLOR },
        { name: "msapplication-TileColor", content: SITE_THEME_COLOR },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
        { name: "apple-mobile-web-app-title", content: SITE_NAME },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "format-detection", content: "telephone=no" },

        // ── Open Graph ───────────────────────────────────────────
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:locale", content: SITE_LOCALE },
        { property: "og:url", content: SITE_URL },
        { property: "og:title", content: `${SITE_NAME} | Live Weather Forecast` },
        { property: "og:description", content: SITE_DESCRIPTION },
        { property: "og:image", content: `${SITE_URL}${OG_IMAGE}` },
        { property: "og:image:secure_url", content: `${SITE_URL}${OG_IMAGE}` },
        { property: "og:image:width", content: String(OG_IMAGE_WIDTH) },
        { property: "og:image:height", content: String(OG_IMAGE_HEIGHT) },
        { property: "og:image:alt", content: OG_IMAGE_ALT },
        { property: "og:image:type", content: "image/png" },

        // ── Twitter Card ─────────────────────────────────────────
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@WeatherCards" },
        { name: "twitter:creator", content: "@WeatherCards" },
        { name: "twitter:title", content: `${SITE_NAME} | Live Weather Forecast` },
        { name: "twitter:description", content: SITE_DESCRIPTION },
        { name: "twitter:image", content: `${SITE_URL}${OG_IMAGE}` },
        { name: "twitter:image:alt", content: OG_IMAGE_ALT },

        // ── Verification ─────────────────────────────────────────
        ...verificationMeta,
      ],

      links: [
        // ── Stylesheets ──────────────────────────────────────────
        { rel: "stylesheet", href: appCss },
        // Font preconnects (performance — reduces render-blocking)
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Caveat:wght@500;700&display=swap",
        },

        // ── Canonical ────────────────────────────────────────────
        { rel: "canonical", href: canonicalUrl("/") },

        // ── Favicon suite ────────────────────────────────────────
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/images/logo.png",
        },

        // ── Apple / PWA ──────────────────────────────────────────
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },

        // ── Preload critical logo image (LCP boost) ──────────────
        {
          rel: "preload",
          as: "image",
          href: "/images/logo.png",
        },
      ],
    };
  },

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// ── Shell (SSR HTML skeleton) ────────────────────────────────────
function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <HeadContent />
        {/* JSON-LD Structured Data — injected here so it's in <head> */}
        <StructuredData />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// ── Root component ────────────────────────────────────────────────
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

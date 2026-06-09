// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Force-enable Nitro with the Vercel SSR preset.
  //
  // Without this, @lovable.dev/vite-tanstack-config skips the Nitro deploy plugin
  // when no Lovable build context is detected (i.e. every Vercel / CI build).
  // The default preset is `cloudflare-module`; `vercel` produces the
  // `.vercel/output/` directory that Vercel's build system expects.
  //
  // On Vercel you can also override this via the NITRO_PRESET environment variable
  // ("vercel") without touching this file — both routes work.
  nitro: {
    preset: "vercel",
  },
});

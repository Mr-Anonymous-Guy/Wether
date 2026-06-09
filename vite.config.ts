import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(async () => {
  // Import nitro lazily — only the `nitro/vite` ESM entry is available.
  const { nitro } = await import("nitro/vite");

  return {
    plugins: [
      // TanStack Start — file-system router + SSR entry wiring.
      // `server.entry` redirects Nitro to src/server.ts (our SSR wrapper).
      tanstackStart({
        server: { entry: "server" },
      }),
      // Standard React fast-refresh.
      react(),
      // Tailwind CSS v4 Vite integration.
      tailwindcss(),
      // Resolve TypeScript path aliases (@ → src/).
      tsConfigPaths(),
      // Nitro SSR bundler — runs only during `vite build`.
      // The `vercel` preset writes to .vercel/output/ which Vercel
      // deploys as a serverless function automatically.
      nitro({
        preset: "vercel",
      }),
    ],
  };
});

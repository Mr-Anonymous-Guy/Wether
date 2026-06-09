import process from "node:process";

// Server-only config. The .server.ts suffix prevents Vite from bundling
// this file into the client — values here never reach the browser.
//
// Always read process.env INSIDE a function or handler, not at module scope,
// so values are resolved per-request rather than at cold-start.
//
// When to use which env-access pattern:
//   - .server.ts module (this file): server-only helpers reused across handlers.
//   - import.meta.env.VITE_FOO: public config readable client + server.
//     Define in .env with the VITE_ prefix. Never put secrets here.

export function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV,
    // Add server-only values here, e.g.:
    //   databaseUrl: process.env.DATABASE_URL,
    //   stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  };
}

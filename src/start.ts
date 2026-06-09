import { createStart, createMiddleware } from "@tanstack/react-start";

// Middleware that catches unhandled server errors and returns a clean 500
// instead of allowing them to propagate as unformatted exceptions.
const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      // Re-throw HTTP errors (4xx, 5xx) — let TanStack Start handle them.
      throw error;
    }
    console.error("[SSR]", error);
    return new Response(
      `<!doctype html><html lang="en"><head><meta charset="utf-8"/><title>Error</title></head><body><h1>Something went wrong</h1><p><a href="/">Go home</a></p></body></html>`,
      { status: 500, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware],
}));

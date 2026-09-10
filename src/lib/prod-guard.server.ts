/**
 * Production runtime checks. Preview and local `vite preview` are not
 * `VERCEL_ENV=production`, so they keep the PGLite fallback.
 */
export function isVercelProduction() {
  return (process.env.VERCEL_ENV ?? "").trim() === "production";
}

export function requireNeonInProduction() {
  const url = (process.env.DATABASE_URL ?? "").trim();
  if (isVercelProduction() && !url) {
    throw new Error("Production requires DATABASE_URL (Neon). Auth and orders are refused.");
  }
}

export const PRODUCTION_AUTH_ORIGINS = [
  "https://southendpizza.app",
  "https://www.southendpizza.app",
] as const;

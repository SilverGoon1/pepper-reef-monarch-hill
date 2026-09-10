#!/usr/bin/env node
/**
 * Nitro bundles @electric-sql/pglite without its WASM payload. Local
 * `vite preview` has no DATABASE_URL, so PGLite must boot — copy the assets
 * next to the bundled module. Deployed apps use Neon and never load them.
 */
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "node_modules/@electric-sql/pglite/dist");
const dest = join(root, ".vercel/output/functions/__server.func/_libs");

if (!existsSync(dest)) process.exit(0);
mkdirSync(dest, { recursive: true });
for (const name of ["pglite.data", "pglite.wasm", "initdb.wasm"]) {
  const from = join(src, name);
  if (!existsSync(from)) continue;
  copyFileSync(from, join(dest, name));
}

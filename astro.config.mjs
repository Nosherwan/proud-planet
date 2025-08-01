// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import node from "@astrojs/node";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Enable React to support React JSX components.
  integrations: [react()],

  // Specifies Astro to use server-side rendering. This is required when using an adapter (like node).
  output: "server",

  // Other valid values are "static" (for static site generation) or "hybrid" (mix of SSR and static).

  adapter: node({
    mode: "standalone", // This configures Astro to use the Node.js adapter in "standalone" mode
    // "standalone" mode means the server will be self-contained and not require an external Node.js server
    // It creates a production-ready server that can be deployed directly
    // This includes a pre-configured HTTP server that will serve your Astro application
    // Alternative to "standalone" would be "middleware" mode which integrates with existing Node.js frameworks
  }),

  vite: {
    plugins: [tailwindcss()],
    server: { port: 3000 },
  },
  server: {
    port: 3000,
    host: true,
  },
});

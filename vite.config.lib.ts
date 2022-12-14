import { defineConfig } from "vite";

import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "TextEngine",
      fileName: "text-engine",
    },
    outDir: "lib",
  },
  server: {},
});

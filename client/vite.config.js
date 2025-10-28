import { defineConfig } from "vite";

export default defineConfig({
  define: {
    global: "window",
  },
  resolve: {
    alias: {
      process: "process/browser",
      buffer: "buffer",
    },
  },
});

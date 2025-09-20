import { defineConfig } from "vite";

export default defineConfig({
  define: {
    global: "window", // 👈 fix "global is not defined"
  },
  resolve: {
    alias: {
      process: "process/browser",
      buffer: "buffer",
    },
  },
});

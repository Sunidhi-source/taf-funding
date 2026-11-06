import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        // one short line instead of a stack trace while the API is still starting
        configure: (proxy) => proxy.on("error", (e) => console.warn(`API not reachable (${e.code || e.message})`)),
      },
    },
  },
});

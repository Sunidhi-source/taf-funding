import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
const DEFAULT_CHAT_ID = "ed805c20-b73a-4a7c-955e-a8c5369fe2f2"; // public Text organization ID
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    {
      name: "chat-org-id",
      transformIndexHtml: (html) =>
        html.replace("__CHAT_ORG_ID__", loadEnv(mode, process.cwd(), "VITE_").VITE_TEXT_ORG_ID || DEFAULT_CHAT_ID),
    },
  ],
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
}));

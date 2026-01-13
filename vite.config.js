import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  // 🔥 MUST MATCH GITHUB REPO NAME
  base: "/alarmclock/",

  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "pwa-192x192.png",
        "pwa-512x512.png",
        "favicon.ico"
      ],
      manifest: {
        name: "chat-app",
        short_name: "chatting-app",
        description: "chatting-app PWA built with Vite + React",
        theme_color: "#0f172a",
        background_color: "#ffffff",
        display: "standalone",

        // 🔥 MUST MATCH base
        start_url: "/alarmclock/",
        scope: "/alarmclock/",

        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
    })
  ]
});

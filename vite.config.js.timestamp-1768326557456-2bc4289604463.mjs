// vite.config.js
import { defineConfig } from "file:///C:/Users/visha/OneDrive/Desktop/WORK/my-app/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/visha/OneDrive/Desktop/WORK/my-app/node_modules/@vitejs/plugin-react/dist/index.js";
import tailwindcss from "file:///C:/Users/visha/OneDrive/Desktop/WORK/my-app/node_modules/@tailwindcss/vite/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/visha/OneDrive/Desktop/WORK/my-app/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
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
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx2aXNoYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXFdPUktcXFxcbXktYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx2aXNoYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXFdPUktcXFxcbXktYXBwXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy92aXNoYS9PbmVEcml2ZS9EZXNrdG9wL1dPUksvbXktYXBwL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tIFwiQHRhaWx3aW5kY3NzL3ZpdGVcIjtcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIC8vIFx1RDgzRFx1REQyNSBNVVNUIE1BVENIIEdJVEhVQiBSRVBPIE5BTUVcbiAgYmFzZTogXCIvYWxhcm1jbG9jay9cIixcblxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB0YWlsd2luZGNzcygpLFxuICAgIFZpdGVQV0Eoe1xuICAgICAgcmVnaXN0ZXJUeXBlOiBcImF1dG9VcGRhdGVcIixcbiAgICAgIGluY2x1ZGVBc3NldHM6IFtcbiAgICAgICAgXCJwd2EtMTkyeDE5Mi5wbmdcIixcbiAgICAgICAgXCJwd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgXCJmYXZpY29uLmljb1wiXG4gICAgICBdLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogXCJjaGF0LWFwcFwiLFxuICAgICAgICBzaG9ydF9uYW1lOiBcImNoYXR0aW5nLWFwcFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJjaGF0dGluZy1hcHAgUFdBIGJ1aWx0IHdpdGggVml0ZSArIFJlYWN0XCIsXG4gICAgICAgIHRoZW1lX2NvbG9yOiBcIiMwZjE3MmFcIixcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxuXG4gICAgICAgIC8vIFx1RDgzRFx1REQyNSBNVVNUIE1BVENIIGJhc2VcbiAgICAgICAgc3RhcnRfdXJsOiBcIi9hbGFybWNsb2NrL1wiLFxuICAgICAgICBzY29wZTogXCIvYWxhcm1jbG9jay9cIixcblxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJwd2EtMTkyeDE5Mi5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJwd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJwd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCJcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9KVxuICBdXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVUsU0FBUyxvQkFBb0I7QUFDOVYsT0FBTyxXQUFXO0FBQ2xCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsZUFBZTtBQUV4QixJQUFPLHNCQUFRLGFBQWE7QUFBQTtBQUFBLEVBRTFCLE1BQU07QUFBQSxFQUVOLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLGVBQWU7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixTQUFTO0FBQUE7QUFBQSxRQUdULFdBQVc7QUFBQSxRQUNYLE9BQU87QUFBQSxRQUVQLE9BQU87QUFBQSxVQUNMO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

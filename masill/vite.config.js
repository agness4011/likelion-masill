import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png}']
      },
      includeAssets: [
        'favicons/favicon.ico',
        'favicons/apple-touch-icon.png',
        'favicons/favicon-96x96.png',
        'favicons/favicon.svg'
      ],
      manifest: {
        id: '/',
        name: 'Masill',
        short_name: 'Masill',
        description: '우리 동네 마실, 어디로 가볼까요?',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'favicons/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  define: {
    global: "globalThis",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://hyunjun.store",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@api", replacement: "/src/api" },
      { find: "@components", replacement: "/src/components" },
      { find: "@commons", replacement: "/src/components/commons" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@layouts", replacement: "/src/layouts" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@icons", replacement: "/src/assets/icons" },
      { find: "@images", replacement: "/src/assets/images" },
      { find: "@store", replacement: "/src/store" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@logo", replacement: "/src/assets/logo" },
      { find: "@assets", replacement: "/src/assets" },
    ],
  },
});

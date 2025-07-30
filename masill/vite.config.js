import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
    ],
  },
});

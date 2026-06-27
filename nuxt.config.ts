import yaml from "@rollup/plugin-yaml";
import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  vite: {
    plugins: [yaml(), svgLoader()],
    optimizeDeps: {
      include: ["@chenglou/pretext"],
    },
  },

  app: {
    head: {
      viewport: "width=615",
    },
  },
});

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
      // Fix layout width to the terminal width (64ch ≈ 614px at 16px Courier)
      // so mobile browsers zoom the whole page to fill the screen → terminal = 100% width.
      viewport: "width=615",
    },
  },
});

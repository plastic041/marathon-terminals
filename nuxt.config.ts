import yaml from "@rollup/plugin-yaml";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    plugins: [yaml()],
    optimizeDeps: {
      include: ["@chenglou/pretext"],
    },
  },
});

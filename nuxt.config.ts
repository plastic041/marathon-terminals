import yaml from "@rollup/plugin-yaml";
import svgLoader from "vite-svg-loader";
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/tailwind.css"],

  vite: {
    plugins: [yaml(), svgLoader(), tailwindcss()],
    optimizeDeps: {
      include: ["@radix-icons/vue", "@vueuse/core", "reka-ui"],
    },
  },

  typescript: {
    typeCheck: true,
  },

  modules: ["shadcn-nuxt"],

  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "Ui",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },
});

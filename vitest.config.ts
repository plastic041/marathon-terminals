import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    // Nuxt 런타임(auto import, useRoute 등)이 필요한 유닛 테스트. e2e 아님.
    environment: "nuxt",
    include: ["test/**/*.spec.ts"],
  },
});

<script setup lang="ts">
import { BASE_URL } from "~/lib/url";

const ogTitle = `Marathon 2`;
const ogDescription = `Epilogue`;

useHead({
  title: "Marathon 2",
  meta: [
    { property: "og:title", content: ogTitle },
    { property: "og:description", content: ogDescription },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: ogTitle },
    { name: "twitter:description", content: ogDescription },
    { property: "og:image", content: `${BASE_URL}/marathon-logo.png` },
    { name: "twitter:image", content: `${BASE_URL}/marathon-logo.png` },
  ],
});
</script>

<template>
  <div
    class="font-[Orbit] mx-auto w-full max-w-[60ch] px-[2ch] pb-80 text-right text-pretty sm:text-balance break-keep wrap-break-word text-lg flex flex-col gap-12"
  >
    마라톤2 엔딩 플레이스홀더
  </div>
</template>

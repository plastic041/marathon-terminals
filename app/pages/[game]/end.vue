<script setup lang="ts">
import { BASE_URL } from "~/lib/url";

const { gameId } = useGame();

const ogTitle = `Marathon`;
const ogDescription = `Epilogue`;

useHead({
  title: "Marathon",
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
  <div class="h-100dvh flex flex-col gap-8">
    <Header />
    <LazyEndM1 v-if="gameId === 'm1'" />
    <LazyEndM2 v-else-if="gameId === 'm2'" />
  </div>
</template>

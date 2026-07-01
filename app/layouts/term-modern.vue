<script setup lang="ts">
import "~/assets/styles/reset.css";
import "~/assets/styles/map.css";

import "~/assets/styles/modern.css";

useHead({
  meta: [
    {
      name: "theme-color",
      content: "#000",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
  ],
});
</script>

<template>
  <div class="layout-modern">
    <slot />
  </div>
</template>

<style>
body {
  background-color: #000;
}
</style>

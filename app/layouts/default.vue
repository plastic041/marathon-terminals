<script setup lang="ts">
import "~/assets/styles/map.css";

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
  <slot />
</template>

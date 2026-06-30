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

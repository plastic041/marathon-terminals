<script setup lang="ts">
import "~/assets/styles/reset.css";
import "~/assets/styles/map.css";

import "~/assets/styles/classic.css";

useHead({
  meta: [{ name: "viewport", content: "width=615" }],
});
</script>

<template>
  <div class="layout-classic">
    <slot />
  </div>
</template>

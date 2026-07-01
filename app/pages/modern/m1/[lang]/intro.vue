<script setup lang="ts">
const route = useRoute();

definePageMeta({
  layout: "term-modern",
});
</script>

<template>
  <div :class="$style.body">
    <ModernHeader />
  </div>
</template>

<style module>
.body {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>

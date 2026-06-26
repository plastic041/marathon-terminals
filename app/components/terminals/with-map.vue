<script setup lang="ts">
import Renderer from "~/components/terminals/renderer.vue";

const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <Renderer type="reading"> todo </Renderer>
</template>

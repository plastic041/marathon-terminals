<script setup lang="ts">
import { MAPS } from "~/games/maps";

const props = defineProps<{
  index: number;
  viewBox?: string;
}>();

const { gameId } = useGame();

const map = computed(() => MAPS[gameId.value][props.index]);
</script>

<template>
  <component v-if="map" :is="map" :viewBox="props.viewBox" />
</template>

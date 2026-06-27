<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import Map from "~/components/map.vue";
import Renderer from "~/components/terminals/renderer.vue";
import { decoration } from "~/lib/decoration";
import type { Checkpoint, Level } from "~/types/terminal";

const props = defineProps<{
  text: string;
  level: Level;
  checkpoint: Checkpoint;
}>();

const WORLD_PER_PX = 81;

const mapWrapper = ref<HTMLElement | null>(null);
const { width, height } = useElementSize(mapWrapper);

const zoomViewBox = computed(() => {
  if (!width.value || !height.value) {
    return undefined;
  }
  const worldW = width.value * WORLD_PER_PX;
  const worldH = height.value * WORLD_PER_PX;
  const minX = props.checkpoint.cx! - worldW / 2;
  const minY = props.checkpoint.cy! - worldH / 2;
  return `${minX} ${minY} ${worldW} ${worldH}`;
});

const checkpointCss = computed(
  () => `
.map-wrapper circle.checkpoint[data-cp="${props.checkpoint.index}"] { opacity: 1; }
`,
);
</script>

<template>
  <Renderer type="reading">
    <component is="style">{{ checkpointCss }}</component>
    <div class="terminal-map-wrapper">
      <div ref="mapWrapper" class="map-wrapper">
        <Map :index="level.index" :viewBox="zoomViewBox" />
      </div>
      <div v-html="decoration(props.text)" />
    </div>
  </Renderer>
</template>

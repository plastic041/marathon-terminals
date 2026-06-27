<script setup lang="ts">
import Map from "~/components/map.vue";
import Renderer from "~/components/terminals/renderer.vue";
import { decoration } from "~/lib/decoration";
import type { Checkpoint, Level } from "~/types/terminal";

const props = defineProps<{
  text: string;
  level: Level;
  checkpoint: Checkpoint;
}>();

const SCALE = 1.2;

const fraction = computed(() => {
  const [minX, minY, width, height] = props.level.viewBox!;
  return [
    (props.checkpoint.cx! - minX) / width,
    (props.checkpoint.cy! - minY) / height,
  ] as const;
});

const mapTransform = computed(() => {
  const [fx, fy] = fraction.value;
  const tx = (0.5 - fx) * 100;
  const ty = (0.5 - fy) * 100;
  return `translate(${tx}%, ${ty}%) scale(${SCALE})`;
});

const transformOrigin = computed(() => {
  const [fx, fy] = fraction.value;
  return `${fx * 100}% ${fy * 100}%`;
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
      <div class="map-wrapper">
        <Map
          :index="level.index"
          :style="{
            transform: mapTransform,
            transformOrigin: transformOrigin,
          }"
        />
      </div>
      <div v-html="decoration(props.text)" />
    </div>
  </Renderer>
</template>

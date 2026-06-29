<script setup lang="ts">
import type { ScrollAreaScrollbarProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { ScrollAreaScrollbar, ScrollAreaThumb } from "reka-ui";

const props = withDefaults(
  defineProps<ScrollAreaScrollbarProps & { class?: HTMLAttributes["class"] }>(),
  {
    orientation: "vertical",
  },
);

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <ScrollAreaScrollbar v-bind="delegatedProps" :class="$style.bar">
    <ScrollAreaThumb :class="$style.thumb" />
  </ScrollAreaScrollbar>
</template>

<style module>
.bar {
  display: flex;
  touch-action: none;
  user-select: none;
  height: 100%;
  width: 1ch;
}

.thumb {
  background-color: lightgreen;
  position: relative;
  flex: 1;
}
</style>

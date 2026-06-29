<script setup lang="ts">
import type { ScrollAreaRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport } from "reka-ui";
import ScrollBar from "./bar.vue";

const props = defineProps<
  ScrollAreaRootProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <ScrollAreaRoot
    v-bind="delegatedProps"
    :class="`${$style.root} ${props.class}`"
    type="auto"
  >
    <ScrollAreaViewport :class="$style.area">
      <slot />
    </ScrollAreaViewport>
    <ClientOnly>
      <ScrollBar />
    </ClientOnly>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<style module>
.root {
  position: relative;
}

.area {
  outline: none;
  width: 100%;
  height: 100%;
  padding: 0 1ch;
}

.area:focus-visible {
  outline: 1px solid lightgreen;
}

/* focus-visible:ring-ring/50
  size-full rounded-[inherit] transition-[color,box-shadow]
outline-none focus-visible:ring-3 focus-visible:outline-1 */
</style>

<script setup lang="ts">
import type { ScrollAreaRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport } from "reka-ui";
import ScrollBar from "./bar.vue";
import { cn } from "~/lib/utils.js";

const props = defineProps<
  ScrollAreaRootProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <ScrollAreaRoot
    v-bind="delegatedProps"
    :class="cn('relative', props.class)"
    type="auto"
  >
    <ScrollAreaViewport class="outline-none size-full px-[1ch]">
      <slot />
    </ScrollAreaViewport>
    <ClientOnly>
      <ScrollBar />
    </ClientOnly>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<script setup lang="ts">
import { BORDERS } from "~/lib/borders";

const props = defineProps<{
  type: "logon" | "logoff" | "reading";
}>();
</script>

<template>
  <div :class="$style.terminal">
    <div :class="$style['terminal-header']">
      <span> {{ BORDERS[type].tl }} </span>
      <span> 0025 08.25.2337 </span>
    </div>
    <div :class="$style['terminal-inner']">
      <UiScrollArea
        :class="$style['terminal-inner-content']"
        v-if="props.type === 'reading'"
      >
        <slot />
      </UiScrollArea>

      <slot v-else />
    </div>
  </div>
</template>

<style module>
.terminal {
  line-height: 1.25;
  font-size: 1rem;
  font-family: Courier, monospace;

  width: 100%;
}

.terminal-header {
  color: var(--text-info);
  background-color: rgb(0, 57, 0);
  display: flex;
  flex-direction: column;
  padding: 0 1ch;
}

.terminal-inner {
  color: var(--text-main);
  height: 24lh;
  white-space: pre-wrap;
  display: flex;
  border-top: 1px solid greenyellow;
  border-bottom: 1px solid greenyellow;
}

.terminal-inner-content {
  min-height: 0;
  flex-grow: 1;
  overflow-y: auto;
  word-break: break-word;
}
</style>

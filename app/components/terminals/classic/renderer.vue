<script setup lang="ts">
import { BORDERS } from "~/lib/borders";

const props = defineProps<{
  type: "logon" | "logoff" | "reading";
}>();

const route = useRoute();
const lang = computed(() => route.params.lang as "en" | "ko");
</script>

<template>
  <div class="terminal">
    <div class="terminal-header">
      <span> {{ BORDERS[lang][type].tl }} </span>
      <span> 0025 08.25.2337 </span>
    </div>
    <div class="terminal-inner">
      <div class="terminal-inner-content">
        <slot />
      </div>
    </div>
    <div class="terminal-footer">
      <span> {{ BORDERS[lang][type].bl }} </span>
      <span> {{ BORDERS[lang][type].br }} </span>
    </div>
  </div>
</template>

<style>
.terminal {
  line-height: 1.25;
  font-size: 1rem;
  font-family: Courier, monospace;
  width: calc(var(--terminal-width) + 2ch);
  background-color: var(--bg-main);
}

.terminal-header,
.terminal-footer {
  color: var(--text-info);
  background-color: var(--bg-info);
  height: 1.5lh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1ch;
}

.terminal-inner {
  color: var(--text-main);
  height: 20lh;
  padding: 1lh 1ch;
  white-space: pre-wrap;
  display: flex;
}

.terminal-inner-content {
  min-height: 0;
  flex-grow: 1;
  overflow-y: hidden;
  word-break: break-word;
}
</style>

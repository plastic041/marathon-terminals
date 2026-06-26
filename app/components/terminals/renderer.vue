<script setup lang="ts">
import { BORDERS } from "~/lib/borders";

const props = defineProps<{
  type: "logon" | "logoff" | "reading";
}>();
</script>

<template>
  <div class="terminal">
    <div class="terminal-header">
      <span class="terminal-info-left"> {{ BORDERS[type].tl }} </span>
      <span class="terminal-info-right"> 0025 08.25.2337 </span>
    </div>
    <div class="terminal-inner">
      <div class="terminal-inner-content">
        <slot />
      </div>
    </div>
    <div class="terminal-footer">
      <span class="terminal-info-left"> {{ BORDERS[type].bl }} </span>
      <span class="terminal-info-right"> {{ BORDERS[type].br }} </span>
    </div>
  </div>
</template>

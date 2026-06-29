<script setup lang="ts">
import Renderer from "./renderer.vue";
import { decorate } from "~/lib/decoration";

const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <Renderer type="logon">
    <div class="terminal-inner-logon">
      <img src="/logon_c0_s44.png" class="terminal-inner-logon-logo" />
      <span class="terminal-inner-logon-heading">U.E.S.C Marathon</span>
      <span v-html="decorate(props.text)" />
    </div>
  </Renderer>
</template>

<style>
.terminal-inner-logon {
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: center;
  justify-content: center;
}

.terminal-inner-logon-logo {
  width: 10.5ch;
  aspect-ratio: 1/1;
}

.terminal-inner-logon-heading {
  margin-top: 1lh;
  font-size: 1.15rem;
  font-weight: bold;
}

.contents {
  display: contents;
}
</style>

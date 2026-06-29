<script setup lang="ts">
import Renderer from "./renderer.vue";
import { decorate } from "~/lib/decoration";

const props = defineProps<{
  text: string;
  type: "logon" | "logoff";
}>();
</script>

<template>
  <Renderer :type="props.type">
    <div :class="$style['terminal-inner-log']">
      <img
        src="/logon_c0_s44.png"
        :class="$style['terminal-inner-logon-logo']"
      />
      <span :class="$style['terminal-inner-logon-heading']"
        >U.E.S.C Marathon</span
      >
      <div v-html="decorate(props.text)" :class="$style['terminal-name']" />
    </div>
  </Renderer>
</template>

<style module>
.terminal-inner-log {
  width: 100%;
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-wrap: balance;
  padding: 0 4ch;
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

.terminal-name {
  height: 2lh;
}
</style>

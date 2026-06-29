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
    <div :class="$style['terminal-inner-logon']">
      <img
        src="/logon_c0_s44.png"
        :class="$style['terminal-inner-logon-logo']"
      />
      <span :class="$style['terminal-inner-logon-heading']"
        >U.E.S.C Marathon</span
      >
      <span v-html="decorate(props.text)" />
    </div>
  </Renderer>
</template>

<style module>
.terminal-inner-logon {
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-wrap: balance;
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
</style>

<script setup lang="ts">
import Renderer from "~/components/terminals/renderer.vue";
import { decoration } from "~/lib/decoration";

const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <Renderer type="logon">
    <div class="terminal-inner-logon">
      <img src="/logon_c0_s44.png" class="terminal-inner-logon-logo" />
      <span class="terminal-inner-logon-heading">U.E.S.C Marathon</span>
      <span v-html="decoration(props.text)" />
    </div>
  </Renderer>
</template>

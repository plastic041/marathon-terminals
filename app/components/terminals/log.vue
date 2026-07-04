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
    <div
      class="size-full min-h-0 flex flex-col items-center justify-center text-center text-balance break-keep px-[4ch]"
    >
      <img src="/logon_c0_s44.png" class="w-[10.5ch] aspect-square" />
      <span class="mt-[1lh] text-lg font-bold">U.E.S.C Marathon</span>
      <div v-html="decorate(props.text)" class="h-[2lh]" />
    </div>
  </Renderer>
</template>

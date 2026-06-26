<script setup lang="ts">
import Renderer from "~/components/terminals/renderer.vue";
import { decoration } from "~/lib/decoration";

const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <Renderer type="reading">
    <div v-html="decoration(props.text)" class="contents" />
  </Renderer>
</template>

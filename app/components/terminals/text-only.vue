<script setup lang="ts">
import Renderer from "./renderer.vue";
import { decorate } from "~/lib/decoration";

const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <Renderer type="reading">
    <div v-html="decorate(props.text)" />
  </Renderer>
</template>

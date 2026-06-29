<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="`${$style.button} ${props.class}`"
  >
    <slot />
  </Primitive>
</template>

<style module>
.button {
  border: 2px solid lightgreen;
  background-color: #000;
  color: lightgreen;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  padding: 0 1ch;
}

.button:disabled {
  border: 2px solid #080;
  color: #080;
}
</style>

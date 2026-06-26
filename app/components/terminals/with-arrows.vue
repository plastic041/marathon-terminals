<script setup lang="ts">
import TextOnly from "~/components/terminals/text-only.vue";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";

const props = defineProps<{
  text: string;
}>();

function split(array: string[], size: number) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunks.push(chunk.join("\n"));
  }

  return chunks;
}

const lines = ref<string[] | null>(null);

onMounted(() => {
  const prepared = prepareWithSegments(props.text, '16px "courier"', {
    whiteSpace: "pre-wrap",
  });
  const { lines: _lines } = layoutWithLines(prepared, 576.09, 20);

  lines.value = _lines.map((line) => line.text);
});

const chunks = computed(() => {
  if (!lines.value) {
    return [props.text];
  }

  if (lines.value.length >= 18) {
    const splitted = split(lines.value, 18);
    console.log(splitted);
    return splitted;
  }

  return [props.text];
});

const index = ref(0);
const indexLength = computed(() => {
  return (chunks.value.length % 18) - 1;
});
</script>

<template>
  <div class="with-controls">
    <TextOnly :text="chunks[index]!" />
    <div class="controls">
      <button
        :disabled="index <= 0"
        @click="
          () => {
            if (index > 0) {
              index -= 1;
            }
          }
        "
      >
        prev
      </button>
      <button
        :disabled="index >= indexLength"
        @click="
          () => {
            if (index < indexLength) {
              index += 1;
            }
          }
        "
      >
        next
      </button>
    </div>
  </div>
</template>

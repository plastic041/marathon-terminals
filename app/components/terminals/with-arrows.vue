<script setup lang="ts">
import TextOnly from "~/components/terminals/text-only.vue";
import {
  prepareWithSegments,
  layoutWithLines,
  type LayoutLine,
} from "@chenglou/pretext";
import { undeco } from "~/lib/decoration";

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

const lines = ref<LayoutLine[] | null>(null);

onMounted(() => {
  const undecoed = undeco(props.text);
  const prepared = prepareWithSegments(undecoed, '16px "courier"', {
    whiteSpace: "pre-wrap",
  });
  const { lines: _lines } = layoutWithLines(prepared, 576.09, 20);

  lines.value = _lines;
});

const chunks = computed(() => {
  if (!lines.value) {
    return [props.text];
  }

  if (lines.value.length >= 18) {
    const splitted = split(
      lines.value.map((line) => line.text),
      18,
    );
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
    <TextOnly :text="props.text" />
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

<script setup lang="ts">
import TextOnly from "~/components/terminals/text-only.vue";
import {
  prepareWithSegments,
  layoutWithLines,
  type LayoutLine,
} from "@chenglou/pretext";
import { undeco, redeco } from "~/lib/decoration";

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

function calculate() {
  const undecoed = undeco(props.text);
  const prepared = prepareWithSegments(undecoed, '16px "courier"', {
    whiteSpace: "pre-wrap",
  });
  const { lines: _lines } = layoutWithLines(prepared, 576.09, 20);

  lines.value = _lines;
}

onMounted(() => {
  calculate();
});

watchEffect(() => {
  calculate();
});

const chunks = computed(() => {
  if (!lines.value) {
    return [props.text];
  }

  if (lines.value.length >= 18) {
    const decoratedLines = redeco(
      props.text,
      lines.value.map((line) => line.text),
    );
    const splitted = split(decoratedLines, 18);
    return splitted;
  }

  return [props.text];
});

const index = ref(0);
const maxIndex = computed(() => {
  return chunks.value.length - 1;
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
        PgUp
      </button>
      <button
        :disabled="index >= maxIndex"
        @click="
          () => {
            if (index < maxIndex) {
              index += 1;
            }
          }
        "
      >
        PgDown
      </button>
    </div>
  </div>
</template>

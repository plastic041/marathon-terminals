import {
  prepareWithSegments,
  layoutWithLines,
  type LayoutLine,
} from "@chenglou/pretext";
import { undeco, redeco } from "~/lib/decoration";

function split(array: string[], size: number) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunks.push(chunk.join("\n"));
  }

  return chunks;
}

export function useScroller(
  text: MaybeRefOrGetter<string>,
  index: MaybeRefOrGetter<number>,
) {
  const lines = ref<LayoutLine[] | null>(null);

  function calculate() {
    const value = toValue(text);
    const undecoed = undeco(value);
    const prepared = prepareWithSegments(undecoed, '16px "courier"', {
      whiteSpace: "pre-wrap",
    });
    const { lines: _lines } = layoutWithLines(prepared, 576.09, 20);

    lines.value = _lines;
  }

  const chunks = computed(() => {
    const value = toValue(text);

    if (!lines.value) {
      return [value];
    }

    if (lines.value.length >= 18) {
      const decoratedLines = redeco(
        value,
        lines.value.map((line) => line.text),
      );
      return split(decoratedLines, 18);
    }

    return [value];
  });

  const maxIndex = computed(() => chunks.value.length - 1);
  const current = computed(() => {
    const clamped = Math.min(Math.max(toValue(index), 0), maxIndex.value);
    return chunks.value[clamped] ?? "";
  });

  watch(() => toValue(text), calculate);

  onMounted(calculate);

  return { chunks, current, maxIndex };
}

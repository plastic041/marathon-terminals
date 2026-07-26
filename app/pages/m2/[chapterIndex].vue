<script setup lang="ts">
import type { Chapter } from "~/types/terminal";
import data from "~/texts/m1/terminals.yaml";
import { ArrowRightIcon } from "@radix-icons/vue";

const route = useRoute();
const chapterIndex = computed(() => Number(route.params.chapterIndex));

const chapters = computed(() => data.chapters as Chapter[]);

const chapter = computed(
  () => chapters.value.find((c) => c.index === chapterIndex.value)!,
);

const firstTerminalLink = computed(() => {
  const firstLevel = chapter.value.levels[0]!;
  const firstTerminal = firstLevel.terminals[0]!;
  return {
    path: `/m1/${firstLevel.index}/${firstTerminal.index}`,
  };
});
</script>

<template>
  <div class="h-100dvh flex flex-col gap-8">
    <Header />
    <img
      :src="`/chapters/${chapterIndex}.gif`"
      class="max-w-4xl mx-auto w-full"
    />
    <UiButton as-child class="w-fit mx-auto">
      <NuxtLink :to="firstTerminalLink">
        <ArrowRightIcon />
      </NuxtLink>
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import type { Chapter } from "~/types/terminal";
import dataEN from "~/texts/m1/terminals-en.yaml";
import dataKR from "~/texts/m1/terminals-kr.yaml";
import { ArrowRightIcon } from "@radix-icons/vue";

const route = useRoute();
const lang = computed(() => String(route.params.lang));
const chapterIndex = computed(() => Number(route.params.chapterIndex));

const chapters = computed(
  () => (lang.value === "en" ? dataEN : dataKR).chapters as Chapter[],
);

const chapter = computed(
  () => chapters.value.find((c) => c.index === chapterIndex.value)!,
);

const firstTerminalLink = computed(() => {
  const firstLevel = chapter.value.levels[0]!;
  const firstTerminal = firstLevel.terminals[0]!;
  return {
    path: `/m1/${lang.value}/${firstLevel.index}/${firstTerminal.index}`,
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

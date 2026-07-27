<script setup lang="ts">
import { ArrowRightIcon } from "@radix-icons/vue";

const route = useRoute();
const { gameId, game, chapters } = useGame();

const chapterIndex = computed(() => Number(route.params.chapterIndex));

const chapter = computed(
  () => chapters.value.find((c) => c.index === chapterIndex.value)!,
);

const image = computed(() => game.value.chapterImage(chapterIndex.value));

const firstTerminalLink = computed(() => {
  const firstLevel = chapter.value.levels[0]!;
  const firstTerminal = firstLevel.terminals[0]!;
  return {
    path: `/${gameId.value}/${firstLevel.index}/${firstTerminal.index}`,
  };
});
</script>

<template>
  <div class="h-100dvh flex flex-col gap-8">
    <Header />
    <img v-if="image" :src="image" class="max-w-4xl mx-auto w-full" />
    <UiButton as-child class="w-fit mx-auto">
      <NuxtLink :to="firstTerminalLink">
        <ArrowRightIcon />
      </NuxtLink>
    </UiButton>
  </div>
</template>

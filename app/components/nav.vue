<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { PopoverClose } from "reka-ui";
import ScrollArea from "~/components/ui/scroll-area/scroll-area.vue";

const route = useRoute();
const selectedEl = ref<HTMLElement | null>(null);

const { gameId, chapters, texts } = useGame();

function setSelectedRef(
  el: Element | ComponentPublicInstance | null,
  levelIndex: number,
  terminalIndex: number,
) {
  if (
    String(levelIndex) === String(route.params.levelIndex) &&
    String(terminalIndex) === String(route.params.terminalIndex)
  ) {
    selectedEl.value = el as HTMLElement | null;
  }
}

onMounted(() => {
  nextTick(() => {
    selectedEl.value?.scrollIntoView({ block: "center" });
  });
});
</script>

<template>
  <ScrollArea as-child>
    <nav class="[&_a]:text-green1 [&_a]:underline [&_a]:bg-green-1">
      <ul class="flex flex-col gap-[1lh]">
        <li>
          <NuxtLink
            :to="{
              name: 'game',
              params: {
                game: gameId,
              },
            }"
          >
            {{ texts.introLabel }}
          </NuxtLink>
        </li>
        <li v-for="chapter in chapters" class="flex flex-col gap-[0.5lh]">
          <h2 class="font-bold">
            <NuxtLink
              :to="{
                name: 'game-chapterIndex',
                params: {
                  game: gameId,
                  chapterIndex: chapter.index,
                },
              }"
            >
              --- {{ chapter.name }}
            </NuxtLink>
          </h2>
          <ul class="flex flex-col gap-[1lh]">
            <li
              v-for="level in chapter.levels"
              class="flex flex-col gap-[0.5lh]"
            >
              <h3 class="ml-[2ch]">{{ level.index }}. {{ level.name }}</h3>

              <ul class="flex flex-col gap-[0.25lh]">
                <li
                  class="flex flex-row"
                  v-for="term in level.terminals"
                  :ref="(el) => setSelectedRef(el, level.index, term.index)"
                >
                  <h4 class="shrink-0 min-w-[4ch]">#{{ term.index }}</h4>
                  <ul class="grid grid-cols-3 grow">
                    <li
                      v-if="term.states.unfinished"
                      class="col-span-3 break-keep"
                    >
                      <PopoverClose as-child>
                        <NuxtLink
                          :to="{
                            name: 'game-levelIndex-terminalIndex',
                            params: {
                              game: gameId,
                              levelIndex: level.index,
                              terminalIndex: term.index,
                            },
                            query: {
                              state: 'logon',
                            },
                          }"
                          >{{ term.logon.text }}</NuxtLink
                        >
                      </PopoverClose>
                    </li>
                    <li v-if="term.states.success">
                      <PopoverClose as-child>
                        <NuxtLink
                          :to="{
                            name: 'game-levelIndex-terminalIndex',
                            params: {
                              game: gameId,
                              levelIndex: level.index,
                              terminalIndex: term.index,
                            },
                            query: {
                              state: 'success',
                            },
                          }"
                          >[성공]</NuxtLink
                        >
                      </PopoverClose>
                    </li>
                    <li v-if="term.states.failure">
                      <PopoverClose as-child>
                        <NuxtLink
                          :to="{
                            name: 'game-levelIndex-terminalIndex',
                            params: {
                              game: gameId,
                              levelIndex: level.index,
                              terminalIndex: term.index,
                            },
                            query: {
                              state: 'failure',
                            },
                          }"
                          >[실패]</NuxtLink
                        >
                      </PopoverClose>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <NuxtLink
            :to="{
              name: 'game-end',
              params: {
                game: gameId,
              },
            }"
          >
            {{ texts.finalScreenLabel }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </ScrollArea>
</template>

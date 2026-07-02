<script setup lang="ts">
import type { TerminalsFile } from "~/types/terminal";
import type { ComponentPublicInstance } from "vue";
import d from "~/texts/m1/terminals-en.yaml";
import { PopoverClose } from "reka-ui";
import ScrollArea from "~/components/ui/scroll-area/scroll-area.vue";

const chapters = (d as TerminalsFile).chapters;

const route = useRoute();
const selectedEl = ref<HTMLElement | null>(null);

const lang = computed(() => route.params.lang as "en" | "ko");

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
              name: 'modern-m1-lang',
              params: {
                lang,
              },
            }"
          >
            Intro
          </NuxtLink>
        </li>
        <li v-for="chapter in chapters" class="flex flex-col gap-[0.5lh]">
          <h2 class="font-bold">--- {{ chapter.name }}</h2>
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
                    <li v-if="term.states.unfinished">
                      <PopoverClose as-child>
                        <NuxtLink
                          :to="{
                            name: 'modern-m1-lang-levelIndex-terminalIndex',
                            params: {
                              lang,
                              levelIndex: level.index,
                              terminalIndex: term.index,
                            },
                            query: {
                              state: 'logon',
                            },
                          }"
                          >Unfinished</NuxtLink
                        >
                      </PopoverClose>
                    </li>
                    <li v-if="term.states.success">
                      <PopoverClose as-child>
                        <NuxtLink
                          :to="{
                            name: 'modern-m1-lang-levelIndex-terminalIndex',
                            params: {
                              lang,
                              levelIndex: level.index,
                              terminalIndex: term.index,
                            },
                            query: {
                              state: 'success',
                            },
                          }"
                          >Success</NuxtLink
                        >
                      </PopoverClose>
                    </li>
                    <li v-if="term.states.failure">
                      <PopoverClose as-child>
                        <NuxtLink
                          :to="{
                            name: 'modern-m1-lang-levelIndex-terminalIndex',
                            params: {
                              lang,
                              levelIndex: level.index,
                              terminalIndex: term.index,
                            },
                            query: {
                              state: 'failure',
                            },
                          }"
                          >Failure</NuxtLink
                        >
                      </PopoverClose>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </ScrollArea>
</template>

<script setup lang="ts">
import type { TerminalsFile } from "~/types/terminal";
import type { ComponentPublicInstance } from "vue";
import d from "~/texts/m1/terminals-en.yaml";
import { PopoverClose } from "reka-ui";

const levels = (d as TerminalsFile).levels;

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
  <UiScrollArea as-child>
    <nav :class="$style.nav">
      <ul :class="$style.levels">
        <li v-for="level in levels">
          <h3 :class="$style['level-name']">
            {{ level.index }}. {{ level.name }}
          </h3>

          <ul v-for="term in level.terminals" :class="$style.terminals">
            <li
              :class="$style.terminal"
              :ref="(el) => setSelectedRef(el, level.index, term.index)"
            >
              <h4 :class="$style['terminal-index']">#{{ term.index }}</h4>
              <ul :class="$style['terminal-types']">
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
    </nav>

    <Notice style="margin-top: 2rem" />
  </UiScrollArea>
</template>

<style module>
.nav {
  font-family: monospace, monospace;
}

.levels {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.level-name {
  margin-left: 1rem;
}

.terminals {
  display: flex;
  flex-direction: column;
}

.terminal {
  display: flex;
  flex-direction: row;
}

.terminal-index {
  flex-shrink: 0;
  min-width: 4ch;
}

.terminal-types {
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.terminal-types a {
  text-decoration: underline;
  background-color: #131;
  color: #0f0;
}
</style>

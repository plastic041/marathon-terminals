<script setup lang="ts">
import type { TerminalsFile } from "~/types/terminal";
import d from "~/terminals/terminals-en.yaml";
import { PopoverClose } from "reka-ui";

const levels = (d as TerminalsFile).levels;
</script>

<template>
  <UiScrollArea as-child>
    <nav>
      <ul :class="$style.levels">
        <li v-for="level in levels">
          <h3 :class="$style['level-name']">
            {{ level.index }}. {{ level.name }}
          </h3>

          <ul v-for="term in level.terminals" :class="$style.terminals">
            <li :class="$style.terminal">
              <h4 :class="$style['terminal-index']">#{{ term.index }}</h4>
              <ul :class="$style['terminal-types']">
                <li v-if="term.states.unfinished">
                  <PopoverClose as-child>
                    <NuxtLink
                      :to="{
                        name: 'modern-lang-levelIndex-terminalIndex',
                        params: {
                          lang: 'en',
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
                        name: 'modern-lang-levelIndex-terminalIndex',
                        params: {
                          lang: 'en',
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
                        name: 'modern-lang-levelIndex-terminalIndex',
                        params: {
                          lang: 'en',
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
  </UiScrollArea>
</template>

<style module>
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

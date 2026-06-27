<script setup lang="ts">
import type { TerminalsFile } from "~/types/terminal";
import d from "~/terminals/terminals-en.yaml";
import Logon from "~/components/terminals/logon.vue";
import Logoff from "~/components/terminals/logoff.vue";
import TextOnly from "~/components/terminals/text-only.vue";
import { LEVELS } from "~/lib/levels";

const levels = (d as TerminalsFile).levels;

definePageMeta({
  layout: "term-en",
});

const {
  levelIndex,
  terminalIndex,
  state,
  scroll,
  currentTerminal,
  scroller: { current: scrollerCurrent, maxIndex: scrollerMaxIndex },
  levelLink,
  prevTerminalLink,
  nextTerminalLink,
  nextScreenLink,
  scrollPrevLink,
  scrollNextLink,
} = useTerminals(levels);
</script>

<template>
  <div>
    <select
      :value="levelIndex"
      @change="
        navigateTo(
          levelLink(Number(($event.target as HTMLSelectElement).value)),
        )
      "
    >
      <option
        v-for="(level, index) in LEVELS"
        :value="level.dataIndex"
        :disabled="level.dataIndex === null"
      >
        {{ index }}. {{ level.name }} ({{ level.terminals }})
      </option>
    </select>
  </div>

  <h2>Terminal #{{ terminalIndex + 1 }}</h2>

  <Logon v-if="state === 'logon'" :text="currentTerminal.logon.text" />
  <TextOnly
    v-if="state === 'unfinished' || state === 'success'"
    :text="scrollerCurrent"
  />
  <Logoff v-if="state === 'logoff'" :text="currentTerminal.logon.text" />

  <div class="controls">
    <NuxtLink v-if="prevTerminalLink" :to="prevTerminalLink"
      >&lt;&lt;&lt;</NuxtLink
    >
    <button v-else disabled>&lt;&lt;&lt;</button>

    <div class="scrollers">
      <NuxtLink replace v-if="scroll > 0" :to="scrollPrevLink">PgUp</NuxtLink>
      <button v-else disabled>PgUp</button>

      <NuxtLink replace v-if="scroll < scrollerMaxIndex" :to="scrollNextLink">
        PgDown
      </NuxtLink>
      <button v-else disabled>PgDown</button>
    </div>

    <NuxtLink :to="nextScreenLink">Return</NuxtLink>

    <NuxtLink v-if="nextTerminalLink" :to="nextTerminalLink"
      >&gt;&gt;&gt;</NuxtLink
    >
    <button v-else disabled>&gt;&gt;&gt;</button>
  </div>
</template>

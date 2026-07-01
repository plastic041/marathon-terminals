<script setup lang="ts">
import type { CheckpointGroup, TerminalsFile } from "~/types/terminal";
import d from "~/texts/m1/terminals-en.yaml";
import { LEVELS } from "~/lib/levels";

const levels = (d as TerminalsFile).levels;

definePageMeta({
  layout: "term-classic",
});

const {
  levelIndex,
  terminalIndex,
  screenIndex,
  state,
  scroll,
  level,
  terminal,
  groupType,
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

  <TerminalsClassicLogon v-if="state === 'logon'" :text="terminal.logon.text" />
  <template v-if="state === 'unfinished' || state === 'success'">
    <TerminalsClassicWithMap
      v-if="groupType === 'checkpoint'"
      :text="scrollerCurrent"
      :level="level"
      :checkpoint="
        (terminal.states[state]![screenIndex]! as CheckpointGroup).checkpoint
      "
    />
    <TerminalsClassicTextOnly v-else :text="scrollerCurrent" />
  </template>
  <TerminalsClassicLogoff
    v-if="state === 'logoff'"
    :text="terminal.logon.text"
  />

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

    <NuxtLink v-if="nextScreenLink" :to="nextScreenLink">Return</NuxtLink>
    <button v-else disabled>Return</button>

    <NuxtLink v-if="nextTerminalLink" :to="nextTerminalLink"
      >&gt;&gt;&gt;</NuxtLink
    >
    <button v-else disabled>&gt;&gt;&gt;</button>
  </div>
</template>

<script setup lang="ts">
import type { TerminalsFile, Terminal } from "../types/terminal";
import d from "../terminals/terminals-en.yaml";
import Logon from "~/components/terminals/logon.vue";
import Logoff from "~/components/terminals/logoff.vue";
import WithArrows from "~/components/terminals/with-arrows.vue";

const levels = (d as TerminalsFile).levels;

definePageMeta({
  layout: "term-en",
});

const levelIndex = ref(0);
const terminalIndex = ref(0);
const status = ref<"logon" | "unfinished" | "success" | "failure" | "logoff">(
  "logon",
);
const screenIndex = ref(0);

const currentLevel = computed(() => levels[levelIndex.value]!);
const currentTerminal = computed(
  () => currentLevel.value.terminals[terminalIndex.value]!,
);
</script>

<template>
  <div>
    <h1>{{ currentLevel.name }}</h1>
    <button
      @click="
        () => {
          levelIndex -= 1;
          terminalIndex = 0;
          status = 'logon';
          screenIndex = 0;
        }
      "
    >
      prev level
    </button>
    <button
      @click="
        () => {
          levelIndex += 1;
          terminalIndex = 0;
          status = 'logon';
          screenIndex = 0;
        }
      "
    >
      next level
    </button>
  </div>

  <Logon v-if="status === 'logon'" :text="currentTerminal.logon.text" />
  <WithArrows
    v-if="status === 'unfinished'"
    :text="currentTerminal.states.unfinished[screenIndex]!.text"
  />
  <WithArrows
    v-if="status === 'success'"
    :text="currentTerminal.states.success![screenIndex]!.text"
  />
  <WithArrows
    v-if="status === 'failure'"
    :text="currentTerminal.states.failure![screenIndex]!.text"
  />
  <Logoff v-if="status === 'logoff'" :text="currentTerminal.logon.text" />

  <div>
    <button
      @click="
        () => {
          status = 'logon';
          screenIndex = 0;
        }
      "
    >
      Logon
    </button>

    <button
      @click="
        () => {
          status = 'unfinished';
          screenIndex = 0;
        }
      "
    >
      Unfinished
    </button>

    <button
      @click="
        () => {
          screenIndex -= 1;
        }
      "
    >
      &lt;
    </button>

    <button
      @click="
        () => {
          screenIndex += 1;
        }
      "
    >
      &gt;
    </button>

    <button
      v-if="currentTerminal.states.success"
      @click="
        () => {
          status = 'success';
          screenIndex = 0;
        }
      "
    >
      Success
    </button>

    <button
      v-if="currentTerminal.states.failure"
      @click="
        () => {
          status = 'failure';
        }
      "
    >
      Failure
    </button>

    <button
      @click="
        () => {
          status = 'logoff';
        }
      "
    >
      Logoff
    </button>
  </div>

  <div v-if="status === 'unfinished'">
    <button
      @click="
        () => {
          screenIndex -= 0;
        }
      "
    >
      prev screen
    </button>
    <button
      @click="
        () => {
          screenIndex += 0;
        }
      "
    >
      next screen
    </button>
  </div>

  <div>
    <button
      @click="
        () => {
          terminalIndex -= 1;
          status = 'logon';
          screenIndex = 0;
        }
      "
    >
      prev terminal
    </button>
    <button
      @click="
        () => {
          terminalIndex += 1;
          status = 'logon';
          screenIndex = 0;
        }
      "
    >
      next terminal
    </button>
  </div>
  <!-- <Logon :text="terminal.logon.text" />
  <WithArrows
    v-for="unfinished in terminal.states.unfinished"
    :text="unfinished.text"
  />
  <WithArrows v-for="success in terminal.states.success" :text="success.text" />
  <WithArrows v-for="failure in terminal.states.failure" :text="failure.text" />
  <Logoff :text="terminal.logon.text" /> -->
  <!-- <ul
    :style="{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    }"
  >
    <template v-for="level in data.levels.slice(0, 1)">
      <ul
        v-for="terminal in level.terminals"
        :style="{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginBottom: '1rem',
        }"
      ></ul>
    </template>
</ul> -->
</template>

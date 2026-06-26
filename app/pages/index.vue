<script setup lang="ts">
import type { TerminalsFile } from "../types/terminal";
import d from "../terminals/terminals-en.yaml";
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
  currentTerminal,
  scroller: {
    current: scrollerCurrent,
    index: scrollerIndex,
    maxIndex: scrollerMaxIndex,
    prev: scrollerPrev,
    next: scrollerNext,
  },
  prevTerminal,
  nextTerminal,
  nextScreen,
} = useTerminals(levels);
</script>

<template>
  <div>
    <select :value="levelIndex">
      <option
        v-for="(level, index) in LEVELS"
        :value="index"
        :disabled="level.terminals === 0"
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
    <button @click="prevTerminal">&lt;&lt;&lt;</button>

    <button :disabled="scrollerIndex <= 0" @click="scrollerPrev">PgUp</button>
    <button :disabled="scrollerIndex >= scrollerMaxIndex" @click="scrollerNext">
      PgDown
    </button>

    <button @click="nextScreen">Return</button>

    <button @click="nextTerminal">&gt;&gt;&gt;</button>
  </div>

  <!-- <div>
    <button
      @click="
        () => {
          state = 'logon';
          screenIndex = 0;
        }
      "
    >
      Logon
    </button>

    <button
      @click="
        () => {
          state = 'unfinished';
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
          state = 'success';
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
          state = 'failure';
        }
      "
    >
      Failure
    </button>

    <button
      @click="
        () => {
          state = 'logoff';
        }
      "
    >
      Logoff
    </button>
  </div>

  <div v-if="state === 'unfinished'">
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
          state = 'logon';
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
          state = 'logon';
          screenIndex = 0;
        }
      "
    >
      next terminal
    </button>
  </div> -->
</template>

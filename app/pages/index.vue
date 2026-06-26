<script setup lang="ts">
import type { TerminalsFile, Terminal } from "../types/terminal";
import d from "../terminals/terminals-en.yaml";
import Logon from "~/components/terminals/logon.vue";
import Logoff from "~/components/terminals/logoff.vue";
import WithArrows from "~/components/terminals/with-arrows.vue";
import { LEVELS } from "~/lib/levels";

const levels = (d as TerminalsFile).levels;

definePageMeta({
  layout: "term-en",
});

type State = "logon" | "unfinished" | "success" | "failure" | "logoff";

const levelIndex = ref(0);
const terminalIndex = ref(0);
const state = ref<State>("logon");
const screenIndex = ref(0);

const currentLevel = computed(() => levels[levelIndex.value]!);
const currentTerminal = computed(
  () => currentLevel.value.terminals[terminalIndex.value]!,
);

function handlePrevTerminal() {
  if (terminalIndex.value > 0) {
    terminalIndex.value -= 1;
  } else {
    const prevLevelIndex = levelIndex.value - 1;
    levelIndex.value -= prevLevelIndex;
    terminalIndex.value = levels[prevLevelIndex]!.terminals.length - 1;
  }
}

function handleNextTerminal() {
  if (terminalIndex.value < currentLevel.value.terminals.length - 1) {
    terminalIndex.value += 1;
  } else {
    levelIndex.value += 1;
    terminalIndex.value = 0;
  }
}

function handleNextScreen() {
  switch (state.value) {
    case "logon": {
      state.value = "unfinished";
      screenIndex.value = 0;
      break;
    }
    case "unfinished": {
      if (
        screenIndex.value <
        currentTerminal.value.states.unfinished.length - 1
      ) {
        screenIndex.value += 1;
      } else {
        screenIndex.value = 0;
        if (currentTerminal.value.states.success) {
          state.value = "success";
        } else {
          state.value = "logoff";
        }
      }
      break;
    }
    case "success": {
      if (
        screenIndex.value <
        currentTerminal.value.states.success!.length - 1
      ) {
        screenIndex.value += 1;
      } else {
        screenIndex.value = 0;
        state.value = "logoff";
      }
      break;
    }
    case "failure": {
      throw new Error("don't handle failure");
    }
    case "logoff": {
      state.value = "logon";
      handleNextTerminal();
      break;
    }
  }
}
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
  <WithArrows
    v-if="state === 'unfinished'"
    :text="currentTerminal.states.unfinished[screenIndex]!.text"
  />
  <WithArrows
    v-if="state === 'success'"
    :text="currentTerminal.states.success![screenIndex]!.text"
  />
  <!-- <WithArrows
    v-if="state === 'failure'"
    :text="currentTerminal.states.failure![screenIndex]!.text"
  /> -->
  <Logoff v-if="state === 'logoff'" :text="currentTerminal.logon.text" />

  <div class="buttons">
    <button
      @click="
        () => {
          terminalIndex -= 1;
          state = 'logon';
          screenIndex = 0;
        }
      "
    >
      &lt;&lt;&lt;
    </button>

    <button
      @click="
        () => {
          handleNextScreen();
        }
      "
    >
      Return
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
      &gt;&gt;&gt;
    </button>
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

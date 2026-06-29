<script setup lang="ts">
import type { CheckpointGroup, TerminalsFile } from "~/types/terminal";
import d from "~/terminals/terminals-en.yaml";
import { LEVELS } from "~/lib/levels";

const levels = (d as TerminalsFile).levels;

definePageMeta({
  layout: "term-modern",
});

const {
  levelIndex,
  terminalIndex,
  screenIndex,
  state,
  level,
  terminal,
  groupType,
  levelLink,
  prevTerminalLink,
  nextTerminalLink,
  nextScreenLink,
} = useTerminalsModern(levels);
</script>

<template>
  <div :class="$style.body">
    <ModernHeader />
    <main :class="$style.main">
      <div :class="$style.contents">
        <div :class="$style['terminal-wrapper']">
          <TerminalsModernTextOnly
            :text="levels[0]?.terminals[0]?.states.unfinished[0]?.text!"
          />
        </div>
        <div>
          <button>-&gt;</button>
        </div>
      </div>
    </main>
  </div>
</template>

<style module>
.body {
  height: 100dvh;
  display: flex;
  flex-direction: column;
}

.main {
  width: 100%;
  max-width: 800px;

  min-height: 0;
  height: 80%;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.contents {
  width: 100%;

  min-height: 0;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* .terminal-wrapper {
  flex-grow: 1;

  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
} */
</style>

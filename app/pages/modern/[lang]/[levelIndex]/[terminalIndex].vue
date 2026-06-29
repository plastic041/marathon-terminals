<script setup lang="ts">
import type { CheckpointGroup, TerminalsFile } from "~/types/terminal";
import d from "~/terminals/terminals-en.yaml";
import { LEVELS } from "~/lib/levels";
import { ArrowRightIcon } from "@radix-icons/vue";

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

  prevTerminalRouteInfo,
  nextTerminalRouteInfo,

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
          <TerminalsModernLog
            v-if="state === 'logon' || state === 'logoff'"
            :text="terminal.logon.text"
            :type="state"
          />
          <TerminalsModernTextOnly
            v-else
            :text="terminal.states[state]![screenIndex]?.text!"
          />
        </div>
        <div>
          <UiButton v-if="nextScreenLink" as-child :class="$style.button">
            <NuxtLink :to="nextScreenLink"> <ArrowRightIcon /> Next </NuxtLink>
          </UiButton>
          <UiButton v-else :class="$style.button" disabled>
            <ArrowRightIcon /> Next
          </UiButton>

          <div>
            {{ nextTerminalRouteInfo }}
            <UiButton v-if="nextScreenLink" as-child :class="$style.button">
              <NuxtLink :to="nextScreenLink">
                <ArrowRightIcon /> Term ()
              </NuxtLink>
            </UiButton>
            <UiButton v-else :class="$style.button" disabled>
              <ArrowRightIcon /> Next Terminal
            </UiButton>

            <UiButton v-if="nextScreenLink" as-child :class="$style.button">
              <NuxtLink :to="nextScreenLink">
                <ArrowRightIcon /> Next
              </NuxtLink>
            </UiButton>
            <UiButton v-else :class="$style.button" disabled>
              <ArrowRightIcon /> Next
            </UiButton>

            <UiButton v-if="nextScreenLink" as-child :class="$style.button">
              <NuxtLink :to="nextScreenLink">
                <ArrowRightIcon /> Next
              </NuxtLink>
            </UiButton>
            <UiButton v-else :class="$style.button" disabled>
              <ArrowRightIcon /> Next
            </UiButton>
          </div>
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

.button {
  padding-left: 0.5ch;
  gap: 0.5ch;
}
</style>

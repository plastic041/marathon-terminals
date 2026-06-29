<script setup lang="ts">
import type { CheckpointGroup, TerminalsFile } from "~/types/terminal";
import dataEN from "~/terminals/terminals-en.yaml";
import dataKR from "~/terminals/terminals-kr.yaml";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-icons/vue";

const route = useRoute();
const lang = computed(() => route.params.lang);

const levels = ((lang.value === "en" ? dataEN : dataKR) as TerminalsFile)
  .levels;

definePageMeta({
  layout: "term-modern",
});

const {
  screenIndex,

  state,
  level,
  terminal,

  groupType,

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
        <h1 :class="$style['terminal-name']">
          {{ level.index }}. {{ level.name }}#{{ terminal.index }}
          <template v-if="state === 'success' || state === 'failure'">
            [{{ state }}]
          </template>
        </h1>
        <div :class="$style['terminal-wrapper']">
          <TerminalsModernLog
            v-if="state === 'logon' || state === 'logoff'"
            :text="terminal.logon.text"
            :type="state"
          />
          <TerminalsModernWithMap
            v-else-if="groupType === 'checkpoint'"
            :text="terminal.states[state]![screenIndex]?.text!"
            :level="level"
            :checkpoint="
              (terminal.states[state]![screenIndex]! as CheckpointGroup)
                .checkpoint
            "
          />
          <TerminalsModernTextOnly
            v-else
            :text="terminal.states[state]![screenIndex]?.text!"
          />
        </div>
        <div>
          <div :class="$style['navigation-controls']">
            <UiButton
              v-if="prevTerminalRouteInfo"
              as-child
              :class="`${$style.button} ${$style['nav-button']}`"
            >
              <NuxtLink :to="prevTerminalLink!">
                <ArrowLeftIcon /> Term L{{
                  prevTerminalRouteInfo.levelIndex
                }}#{{ prevTerminalRouteInfo.terminalIndex }}
              </NuxtLink>
            </UiButton>
            <UiButton
              v-else
              :class="`${$style.button} ${$style['nav-button']}`"
              disabled
            >
              <ArrowLeftIcon /> -
            </UiButton>

            <UiButton
              v-if="nextTerminalRouteInfo"
              as-child
              :class="`${$style.button} ${$style['nav-button']}`"
            >
              <NuxtLink :to="nextTerminalLink!">
                <ArrowRightIcon /> Term L{{
                  nextTerminalRouteInfo.levelIndex
                }}#{{ nextTerminalRouteInfo.terminalIndex }}
              </NuxtLink>
            </UiButton>
            <UiButton
              v-else
              :class="`${$style.button} ${$style['nav-button']}`"
              disabled
            >
              <ArrowRightIcon /> -
            </UiButton>

            <UiButton
              v-if="nextScreenLink"
              as-child
              :class="$style.button"
              style="margin-left: auto"
            >
              <NuxtLink :to="nextScreenLink">
                <ArrowRightIcon /> Next
              </NuxtLink>
            </UiButton>
            <UiButton
              v-else
              :class="$style.button"
              style="margin-left: auto"
              disabled
            >
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
  gap: 1rem;
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

.terminal-name {
  line-height: 1;
  font-size: 1.25rem;
  text-wrap: pretty;
}

.button {
  padding-left: 0.5ch;
  gap: 0.5ch;
}

.nav-button {
  min-width: 13ch;
}

.navigation-controls {
  display: flex;
  flex-direction: row;
  padding: 0 1ch;
}
</style>

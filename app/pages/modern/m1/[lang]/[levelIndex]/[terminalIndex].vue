<script setup lang="ts">
import type { Chapter, CheckpointGroup } from "~/types/terminal";
import dataEN from "~/texts/m1/terminals-en.yaml";
import dataKR from "~/texts/m1/terminals-kr.yaml";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-icons/vue";
import { BASE_URL } from "~/lib/url";
import { escapeHtml } from "~/lib/decoration";

const route = useRoute();
const lang = computed(() => route.params.lang);

const chapters = (lang.value === "en" ? dataEN : dataKR).chapters as Chapter[];

const {
  screenIndex,

  state,
  level,
  levelIndex,
  terminal,
  terminalIndex,

  groupType,

  prevTerminalRouteInfo,
  nextTerminalRouteInfo,

  prevTerminalLink,
  nextTerminalLink,

  nextScreenLink,
} = useTerminalsModern(chapters);

const ogTitle = computed(
  () => `L${String(levelIndex.value).padStart(2, "0")}#${terminalIndex.value}`,
);
const ogDescription = computed(() => escapeHtml(terminal.value.logon.text));

useHead({
  title: ogTitle,
  meta: [
    { property: "og:title", content: ogTitle },
    { property: "og:description", content: ogDescription },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: ogTitle },
    { name: "twitter:description", content: ogDescription },
    { property: "og:image", content: `${BASE_URL}/marathon-logo.png` },
    { name: "twitter:image", content: `${BASE_URL}/marathon-logo.png` },
  ],
});
</script>

<template>
  <div class="h-dvh flex flex-col gap-4">
    <Header />
    <main class="w-full max-w-200 min-h-0 h-4/5 mx-auto flex flex-col">
      <div class="size-full min-h-0 flex flex-col gap-4">
        <h1 class="leading-none text-xl px-[1ch] flex flex-col">
          <span class="leading-normal text-pretty">
            {{ level.index }}. {{ level.name }}
          </span>
          <span class="text-sm leading-tight text-pretty">
            #{{ terminal.index }} - {{ terminal.logon.text }}
          </span>
          <template v-if="state === 'success' || state === 'failure'">
            [{{ state }}]
          </template>
        </h1>
        <div>
          <TerminalsLog
            v-if="state === 'logon' || state === 'logoff'"
            :text="terminal.logon.text"
            :type="state"
          />
          <TerminalsWithMap
            v-else-if="groupType === 'checkpoint'"
            :text="terminal.states[state]![screenIndex]?.text!"
            :level="level"
            :checkpoint="
              (terminal.states[state]![screenIndex]! as CheckpointGroup)
                .checkpoint
            "
          />
          <TerminalsTextOnly
            v-else
            :text="terminal.states[state]![screenIndex]?.text!"
          />
        </div>
        <div>
          <div class="flex flex-row px-[1ch]">
            <UiButton
              v-if="prevTerminalRouteInfo"
              as-child
              class="min-w-[13ch]"
            >
              <NuxtLink :to="prevTerminalLink!">
                <template v-if="isChapterRouteInfo(prevTerminalRouteInfo)">
                  <ArrowLeftIcon />
                </template>
                <template v-else>
                  <ArrowLeftIcon /> L{{ prevTerminalRouteInfo.levelIndex }}#{{
                    prevTerminalRouteInfo.terminalIndex
                  }}
                </template>
              </NuxtLink>
            </UiButton>
            <UiButton v-else class="min-w-[13ch]" disabled>
              <ArrowLeftIcon /> -
            </UiButton>

            <UiButton
              v-if="nextTerminalRouteInfo"
              as-child
              class="min-w-[13ch]"
            >
              <NuxtLink :to="nextTerminalLink!">
                <template v-if="isChapterRouteInfo(nextTerminalRouteInfo)">
                  <ArrowRightIcon />
                </template>
                <template v-else>
                  <ArrowRightIcon /> L{{ nextTerminalRouteInfo.levelIndex }}#{{
                    nextTerminalRouteInfo.terminalIndex
                  }}
                </template>
              </NuxtLink>
            </UiButton>
            <UiButton v-else class="min-w-[13ch]" disabled>
              <ArrowRightIcon /> -
            </UiButton>

            <UiButton
              v-if="nextScreenLink"
              as-child
              class="min-w-[13ch] ml-auto"
            >
              <NuxtLink :to="nextScreenLink">
                <ArrowRightIcon /> Next
              </NuxtLink>
            </UiButton>
            <UiButton v-else class="min-w-[13ch] ml-auto" disabled>
              <ArrowRightIcon /> Next
            </UiButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

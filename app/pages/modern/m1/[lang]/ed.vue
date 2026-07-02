<script setup lang="ts">
import { ArrowRightIcon } from "@radix-icons/vue";
import { decorate } from "~/lib/decoration";
import { intro as introEN } from "~/texts/m1/intro-en";
import { intro as introKO } from "~/texts/m1/intro-ko";

const route = useRoute();
const lang = computed(() => route.params.lang);
</script>

<template>
  <div class="h-100dvh flex flex-col gap-1">
    <ModernHeader />
    <div
      class="font-[Orbit] mx-auto w-full max-w-[65ch] flex flex-col items-center gap-[1lh] pl-[2ch] pr-[2ch] pb-80"
    >
      <template v-if="lang === 'en'">
        <span class="text-lg">
          {{ introEN.title }}
        </span>

        <div
          class="whitespace-pre-wrap w-full"
          v-html="decorate(introEN.text)"
        />
      </template>

      <template v-if="lang === 'ko'">
        <span class="text-lg">
          {{ introKO.title }}
        </span>

        <div
          class="whitespace-pre-wrap w-full"
          v-html="decorate(introKO.text)"
        />
      </template>

      <UiButton as-child>
        <NuxtLink
          :to="{
            name: 'modern-m1-lang-levelIndex-terminalIndex',
            params: {
              lang: 'ko',
              levelIndex: 0,
              terminalIndex: 0,
            },
          }"
        >
          <ArrowRightIcon /> Term L00#0
        </NuxtLink>
      </UiButton>
    </div>
  </div>
</template>

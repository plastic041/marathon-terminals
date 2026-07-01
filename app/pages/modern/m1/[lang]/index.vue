<script setup lang="ts">
import { ArrowRightIcon } from "@radix-icons/vue";
import { decorate } from "~/lib/decoration";
import { intro as introEN } from "~/texts/m1/intro-en";
import { intro as introKO } from "~/texts/m1/intro-ko";

const route = useRoute();
const lang = computed(() => route.params.lang);

definePageMeta({
  layout: "term-modern",
});
</script>

<template>
  <div :class="$style.body">
    <ModernHeader />
    <div :class="$style.container">
      <template v-if="lang === 'en'">
        <span :class="$style.title">
          {{ introEN.title }}
        </span>

        <div :class="$style.content" v-html="decorate(introEN.text)" />
      </template>

      <template v-if="lang === 'ko'">
        <span :class="$style.title">
          {{ introKO.title }}
        </span>

        <div :class="$style.content" v-html="decorate(introKO.text)" />
      </template>

      <UiButton as-child :class="`${$style.button} ${$style['nav-button']}`">
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

<style module>
.body {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.container {
  font-family: "Orbit", sans-serif;
  margin: 0 auto;
  width: 100%;
  max-width: 65ch;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1lh;
  padding: 0 2ch;
  padding-bottom: 20rem;
}

.content {
  width: 100%;
  white-space: pre-wrap;
}

.title {
  font-family: sans-serif;
  font-size: 1.25rem;
}

.button {
  padding-left: 0.5ch;
  gap: 0.5ch;
}

.nav-button {
  min-width: 13ch;
}
</style>

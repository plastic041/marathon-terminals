<script setup lang="ts">
import { ArrowRightIcon } from "@radix-icons/vue";
import { decorate } from "~/lib/decoration";
import { BASE_URL } from "~/lib/url";
import { INTRO } from "~/texts/m1/intro";
import { intro as introEN } from "~/texts/m1/intro-en";
import { intro as introKO } from "~/texts/m1/intro-ko";

const route = useRoute();
const lang = computed(() => route.params.lang as "en" | "ko");

const ogTitle = `Marathon`;
const ogDescription = `그들이 하늘에서, 기다린다.`;

useHead({
  title: "Marathon",
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
  <div class="h-100dvh flex flex-col gap-8">
    <Header />
    <div
      class="font-[Orbit] mx-auto w-full max-w-[65ch] flex flex-col items-center gap-[1lh] px-[2ch] pb-80"
    >
      <span class="text-lg">
        {{ INTRO[lang].title }}
      </span>

      <div
        class="whitespace-pre-wrap w-full"
        v-html="decorate(INTRO[lang].text)"
      />

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

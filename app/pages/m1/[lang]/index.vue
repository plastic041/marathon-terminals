<script setup lang="ts">
import { ArrowRightIcon } from "@radix-icons/vue";
import { decorate } from "~/lib/decoration";
import { BASE_URL } from "~/lib/url";
import { TEXTS } from "~/texts/m1/texts";

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
        {{ TEXTS[lang].title }}
      </span>

      <div
        class="whitespace-pre-wrap w-full text-lg text-pretty sm:text-balance break-keep wrap-break-word"
        v-html="decorate(TEXTS[lang].intro)"
      />

      <UiButton as-child>
        <NuxtLink
          :to="{
            name: 'm1-lang-chapterIndex',
            params: {
              lang,
              chapterIndex: 0,
            },
          }"
        >
          <ArrowRightIcon />
        </NuxtLink>
      </UiButton>
    </div>
  </div>
</template>

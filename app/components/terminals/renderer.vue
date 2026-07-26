<script setup lang="ts">
import ScrollArea from "~/components/ui/scroll-area/scroll-area.vue";
import { BORDERS } from "~/lib/borders";

const props = defineProps<{
  type: "logon" | "logoff" | "reading" | "checkpoint";
}>();

const route = useRoute();
</script>

<template>
  <div class="leading-tight w-full">
    <div class="text-red bg-red-1 flex flex-col px-[1ch]">
      <span> {{ BORDERS["ko"][props.type].tl }} </span>
      <span> 0025 08.25.2337 </span>
    </div>
    <div class="h-[22lh] whitespace-pre-wrap flex border-y border-y-green1">
      <ScrollArea
        class="min-h-0 grow overflow-y-auto wrap-break-word py-[1lh] break-keep leading-relaxed"
        v-if="props.type === 'reading'"
      >
        <slot />
      </ScrollArea>

      <slot v-else />
    </div>
  </div>
</template>

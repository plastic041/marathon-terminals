<script setup lang="ts">
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
} from "reka-ui";
import Nav from "~/components/nav.vue";
import { HamburgerMenuIcon } from "@radix-icons/vue";
</script>

<template>
  <header class="shrink-0 flex flex-row justify-between items-center px-[1ch]">
    <PopoverRoot>
      <PopoverTrigger as-child>
        <UiButton>
          <HamburgerMenuIcon class="size-6" />
        </UiButton>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          class="w-screen h-[40dvh] min-h-0 overflow-y-auto bg-black border-y border-y-green1 px-[1ch] py-[1lh]"
        >
          <Nav />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>

    <Notice />
  </header>
</template>

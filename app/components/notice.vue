<script setup lang="ts">
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "reka-ui";
</script>

<template>
  <PopoverRoot>
    <PopoverTrigger class="text-xs underline border-none">
      This is fan-made
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent class="w-full max-w-200 leading-none text-sm">
        <div
          class="w-full py-[1lh] px-[1ch] min-h-0 overflow-auto bg-black border border-green1 text-balance"
        >
          This is a fan-made site and is not affiliated with or endorsed by
          Bungie. All assets and text are the property of Bungie.
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

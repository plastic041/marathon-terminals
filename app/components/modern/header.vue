<script setup lang="ts">
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverAnchor,
  PopoverPortal,
  PopoverContent,
  PopoverClose,
} from "reka-ui";
import Nav from "~/components/modern/nav.vue";
</script>

<template>
  <header :class="$style.header">
    <PopoverRoot>
      <PopoverTrigger as-child>
        <button>+</button>
      </PopoverTrigger>
      <PopoverAnchor />
      <PopoverPortal>
        <PopoverContent :class="$style.content">
          <Nav />
          <PopoverClose />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </header>
</template>

<style module>
.header {
  flex-shrink: 0;
}

.content {
  width: 100vw;
  height: 80dvh;
  min-height: 0;
  overflow: auto;
}
</style>

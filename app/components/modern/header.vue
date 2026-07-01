<script setup lang="ts">
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
} from "reka-ui";
import Nav from "~/components/modern/nav.vue";
import { HamburgerMenuIcon } from "@radix-icons/vue";
</script>

<template>
  <header :class="$style.header">
    <PopoverRoot>
      <PopoverTrigger as-child>
        <UiButton>
          <HamburgerMenuIcon :class="$style.icon" />
        </UiButton>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent :class="$style.content">
          <Nav />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>

    <div :class="$style['fanmade-notice']">
      <Notice />
    </div>
  </header>
</template>

<style module>
.header {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content {
  width: 100vw;
  height: 40dvh;
  min-height: 0;
  overflow: auto;
  background-color: #000;
  color: var(--text-main);
  border-top: 1px solid lightgreen;
  border-bottom: 1px solid lightgreen;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>

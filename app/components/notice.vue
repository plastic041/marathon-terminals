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
    <PopoverTrigger :class="$style.trigger"> This is fan-made </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent :class="$style.content">
        <div :class="$style.notice">
          This is a fan-made site and is not affiliated with or endorsed by
          Bungie. All assets and text are the property of Bungie.
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style module>
.trigger {
  font-size: 0.8rem;
  background-color: transparent;
  border: none;
  text-decoration: underline;
  color: #0f0;
}

.notice {
  width: 100%;
  max-width: 800px;
  line-height: 1;
  font-size: 0.75rem;
}

.content {
  width: 100vw;
  padding: 1lh 1ch;
  min-height: 0;
  overflow: auto;
  background-color: #000;
  color: var(--text-main);
  border-top: 1px solid lightgreen;
  border-bottom: 1px solid lightgreen;
}
</style>

<script setup lang="ts">
import type { TerminalsFile } from "../types/terminal";
import d from "../terminals/terminals-en.yaml";
import Logon from "~/components/terminals/logon.vue";
import Logoff from "~/components/terminals/logoff.vue";
import WithArrows from "~/components/terminals/with-arrows.vue";

const data = d as TerminalsFile;
definePageMeta({
  layout: "term-en",
});
</script>

<template>
  <ul
    :style="{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    }"
  >
    <template v-for="level in data.levels.slice(0, 1)">
      <ul
        v-for="terminal in level.terminals"
        :style="{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginBottom: '1rem',
        }"
      >
        <Logon :text="terminal.logon.text" />
        <WithArrows
          v-for="unfinished in terminal.states.unfinished"
          :text="unfinished.text"
        />
        <WithArrows
          v-for="success in terminal.states.success"
          :text="success.text"
        />
        <WithArrows
          v-for="failure in terminal.states.failure"
          :text="failure.text"
        />
        <Logoff :text="terminal.logon.text" />
      </ul>
    </template>
  </ul>
</template>

import type { Level } from "~/types/terminal";

export type TerminalState =
  | "logon"
  | "unfinished"
  | "success"
  | "failure"
  | "logoff";

export function useTerminals(levels: Level[]) {
  const levelIndex = ref(0);
  const terminalIndex = ref(0);
  const state = ref<TerminalState>("logon");
  const screenIndex = ref(0);

  const currentLevel = computed(() => levels[levelIndex.value]!);
  const currentTerminal = computed(
    () => currentLevel.value.terminals[terminalIndex.value]!,
  );

  const terminalText = computed(() => {
    if (state.value === "unfinished") {
      return currentTerminal.value.states.unfinished[screenIndex.value]!.text;
    }
    if (state.value === "success") {
      return currentTerminal.value.states.success![screenIndex.value]!.text;
    }
    return "";
  });

  const scroller = useScroller(terminalText);

  function prevTerminal() {
    screenIndex.value = 0;
    if (terminalIndex.value > 0) {
      terminalIndex.value -= 1;
    } else {
      const prevLevelIndex = levelIndex.value - 1;
      levelIndex.value -= prevLevelIndex;
      terminalIndex.value = levels[prevLevelIndex]!.terminals.length - 1;
    }
  }

  function nextTerminal() {
    screenIndex.value = 0;
    if (terminalIndex.value < currentLevel.value.terminals.length - 1) {
      terminalIndex.value += 1;
    } else {
      levelIndex.value += 1;
      terminalIndex.value = 0;
    }
  }

  function nextScreen() {
    switch (state.value) {
      case "logon": {
        state.value = "unfinished";
        screenIndex.value = 0;
        break;
      }
      case "unfinished": {
        if (
          screenIndex.value <
          currentTerminal.value.states.unfinished.length - 1
        ) {
          screenIndex.value += 1;
        } else {
          screenIndex.value = 0;
          if (currentTerminal.value.states.success) {
            state.value = "success";
          } else {
            state.value = "logoff";
          }
        }
        break;
      }
      case "success": {
        if (
          screenIndex.value <
          currentTerminal.value.states.success!.length - 1
        ) {
          screenIndex.value += 1;
        } else {
          screenIndex.value = 0;
          state.value = "logoff";
        }
        break;
      }
      case "failure": {
        throw new Error("don't handle failure");
      }
      case "logoff": {
        state.value = "logon";
        nextTerminal();
        break;
      }
    }
  }

  return {
    levelIndex,
    terminalIndex,
    state,
    screenIndex,
    currentLevel,
    currentTerminal,
    scroller,
    prevTerminal,
    nextTerminal,
    nextScreen,
  };
}

import type { RouteLocationRaw } from "vue-router";

export function useTerminals() {
  const { gameId, chapters } = useGame();

  const levels = computed(() => chapters.value.flatMap((c) => c.levels));

  const route = useRoute();

  const levelIndex = computed(() => Number(route.params.levelIndex));
  const terminalIndex = computed(() => Number(route.params.terminalIndex));
  const state = computed<TerminalState>(
    () => (route.query.state as TerminalState) || "logon",
  );
  const screenIndex = computed(() => Number(route.query.screenindex ?? 0));

  const level = computed(
    () => levels.value.find((level) => level.index === levelIndex.value)!,
  );
  const terminal = computed(
    () =>
      level.value.terminals.find((term) => term.index === terminalIndex.value)!,
  );

  const groupType = computed(() => {
    switch (state.value) {
      case "unfinished":
      case "success":
      case "failure": {
        return terminal.value.states[state.value]![screenIndex.value]!.type;
      }
      default: {
        return "unfinished";
      }
    }
  });

  function makeRoute(info: RouteInfo): RouteLocationRaw {
    if (isChapterRouteInfo(info)) {
      return {
        path: `/${gameId.value}/${info.chapterIndex}`,
      };
    }

    if (isEndRouteInfo(info)) {
      return {
        path: `/${gameId.value}/end`,
      };
    }

    return {
      path: `/${gameId.value}/${info.levelIndex ?? levelIndex.value}/${info.terminalIndex ?? terminalIndex.value}`,
      query: {
        state: info.state ?? state.value,
        screenindex: info.screenIndex ?? screenIndex.value,
      },
    };
  }

  const prevTerminalRouteInfo = computed<RouteInfo | null>(() => {
    const chapter = chapters.value.find((c) =>
      c.levels.some((l) => l.index === levelIndex.value),
    )!;
    const isFirstLevelOfChapter = levelIndex.value === chapter.levels[0]!.index;
    const isFirstTerminalOfLevel =
      terminalIndex.value === level.value.terminals[0]!.index;
    if (isFirstLevelOfChapter && isFirstTerminalOfLevel) {
      return { chapterIndex: chapter.index };
    }

    const firstTerminalIndex = level.value.terminals[0]!.index;

    const lIndex =
      terminalIndex.value === firstTerminalIndex
        ? levels.value[
            levels.value.findIndex(
              (level) => level.index === levelIndex.value,
            ) - 1
          ]?.index!
        : levelIndex.value;

    const tIndex =
      terminalIndex.value === firstTerminalIndex
        ? levels.value.find((l) => l.index === lIndex)!.terminals.at(-1)!.index
        : levels.value.find((l) => l.index === lIndex)!.terminals[
            level.value.terminals.findIndex(
              (t) => t.index === terminalIndex.value,
            )! - 1
          ]!.index;

    return {
      levelIndex: lIndex,
      screenIndex: 0,
      state: "logon",
      terminalIndex: tIndex,
    };
  });

  const nextTerminalRouteInfo = computed<RouteInfo | null>(() => {
    const lastLevel = chapters.value.at(-1)!.levels.at(-1)!;
    const isLastTerminalOfGame =
      levelIndex.value === lastLevel.index &&
      terminalIndex.value === lastLevel.terminals.at(-1)!.index;
    if (isLastTerminalOfGame) {
      return {
        end: true,
      };
    }

    const chapterArrIndex = chapters.value.findIndex((c) =>
      c.levels.some((l) => l.index === levelIndex.value),
    );
    const chapter = chapters.value[chapterArrIndex]!;
    const isLastLevelOfChapter =
      levelIndex.value === chapter.levels.at(-1)!.index;
    const isLastTerminalOfLevel =
      terminalIndex.value === level.value.terminals.at(-1)!.index;
    if (isLastLevelOfChapter && isLastTerminalOfLevel) {
      const nextChapter = chapters.value[chapterArrIndex + 1];
      if (nextChapter) {
        return { chapterIndex: nextChapter.index };
      }
    }

    const lastTerminalIndex = level.value.terminals.at(-1)!.index;

    const lIndex =
      terminalIndex.value === lastTerminalIndex
        ? levels.value[
            levels.value.findIndex(
              (level) => level.index === levelIndex.value,
            ) + 1
          ]?.index
        : levelIndex.value;

    const tIndex =
      terminalIndex.value === lastTerminalIndex
        ? levels.value.find((level) => level.index === lIndex)!.terminals[0]!
            .index
        : level.value.terminals[
            level.value.terminals.findIndex(
              (t) => t.index === terminalIndex.value,
            )! + 1
          ]!.index;

    return {
      levelIndex: lIndex,
      screenIndex: 0,
      state: "logon",
      terminalIndex: tIndex,
    };
  });

  function levelLink(dataIndex: number): RouteLocationRaw {
    return makeRoute({
      levelIndex: dataIndex,
      terminalIndex: 0,
      state: "logon",
      screenIndex: 0,
    });
  }

  const prevTerminalLink = computed<RouteLocationRaw | null>(() => {
    if (prevTerminalRouteInfo.value) {
      return makeRoute(prevTerminalRouteInfo.value);
    }
    return null;
  });

  const nextTerminalLink = computed<RouteLocationRaw | null>(() => {
    if (nextTerminalRouteInfo.value) {
      return makeRoute(nextTerminalRouteInfo.value);
    }

    return null;
  });

  const nextScreenLink = computed<RouteLocationRaw | null>(() => {
    if (state.value === "logoff") {
      return null;
    }

    switch (state.value) {
      case "logon": {
        if (terminal.value.states.unfinished.length > 0) {
          return makeRoute({ state: "unfinished", screenIndex: 0 });
        } else {
          return makeRoute({ state: "success", screenIndex: 0 });
        }
      }
      case "unfinished": {
        if (screenIndex.value < terminal.value.states.unfinished.length - 1) {
          return makeRoute({ screenIndex: screenIndex.value + 1 });
        }
        if ((terminal.value.states.success?.length ?? 0) > 0) {
          return makeRoute({ state: "success", screenIndex: 0 });
        }
        return makeRoute({ state: "logoff", screenIndex: 0 });
      }
      case "success": {
        if (screenIndex.value < terminal.value.states.success!.length - 1) {
          return makeRoute({ screenIndex: screenIndex.value + 1 });
        }
        return makeRoute({ state: "logoff", screenIndex: 0 });
      }
      case "failure": {
        if (screenIndex.value < terminal.value.states.failure!.length - 1) {
          return makeRoute({ screenIndex: screenIndex.value + 1 });
        }
        return makeRoute({ state: "logoff", screenIndex: 0 });
      }
    }
  });

  return {
    levelIndex,
    level,

    terminal,
    terminalIndex,

    state,

    screenIndex,

    levelLink,

    prevTerminalRouteInfo,
    nextTerminalRouteInfo,

    prevTerminalLink,
    nextTerminalLink,

    nextScreenLink,

    groupType,
  };
}

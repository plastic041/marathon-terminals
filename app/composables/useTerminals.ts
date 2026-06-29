import type { RouteLocationRaw } from "vue-router";
import type { Level } from "~/types/terminal";

export type TerminalState =
  | "logon"
  | "unfinished"
  | "success"
  | "failure"
  | "logoff";

type RouteInfo = {
  levelIndex?: number;
  terminalIndex?: number;
  state?: TerminalState;
  screenIndex?: number;
  scroll?: number;
};

/** /:levelIndex/:terminalIndex?state=&screenindex=number&scroll=number */
export function useTerminals(levels: Level[]) {
  const route = useRoute();

  const lang = computed(() => route.params.lang ?? "en");
  const levelIndex = computed(() => Number(route.params.levelIndex));
  const terminalIndex = computed(() => Number(route.params.terminalIndex));
  const state = computed<TerminalState>(
    () => (route.query.state as TerminalState) || "logon",
  );
  const screenIndex = computed(() => Number(route.query.screenindex ?? 0));
  const scroll = computed(() => Number(route.query.scroll ?? 0));

  const level = computed(() => levels[levelIndex.value]!);
  const terminal = computed(() => level.value.terminals[terminalIndex.value]!);

  const screenText = computed(() => {
    if (state.value === "unfinished") {
      return terminal.value.states.unfinished[screenIndex.value]!.text;
    }
    if (state.value === "success") {
      return terminal.value.states.success![screenIndex.value]!.text;
    }
    return "";
  });

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

  const scroller = useScroller(screenText, scroll, groupType);

  function makeRoute(info: RouteInfo): RouteLocationRaw {
    return {
      path: `/classic/${lang.value}/${info.levelIndex ?? levelIndex.value}/${info.terminalIndex ?? terminalIndex.value}`,
      query: {
        state: info.state ?? state.value,
        screenindex: info.screenIndex ?? screenIndex.value,
        scroll: info.scroll ?? scroll.value,
      },
    };
  }

  function getPrevTerminalRouteInfo(): RouteInfo {
    if (terminalIndex.value > 0) {
      return { terminalIndex: terminalIndex.value - 1 };
    }
    const prevLevelIndex = levelIndex.value - 1;
    return {
      levelIndex: prevLevelIndex,
      terminalIndex: levels[prevLevelIndex]!.terminals.length - 1,
    };
  }

  function getNextTerminalRouteInfo(): RouteInfo {
    if (terminalIndex.value < level.value.terminals.length - 1) {
      return { terminalIndex: terminalIndex.value + 1 };
    }
    return { levelIndex: levelIndex.value + 1, terminalIndex: 0 };
  }

  function levelLink(dataIndex: number): RouteLocationRaw {
    return makeRoute({
      levelIndex: dataIndex,
      terminalIndex: 0,
      state: "logon",
      screenIndex: 0,
      scroll: 0,
    });
  }

  const prevTerminalLink = computed<RouteLocationRaw | undefined>(() => {
    if (terminalIndex.value === 0 && levelIndex.value === 0) {
      return undefined;
    }
    return makeRoute({
      ...getPrevTerminalRouteInfo(),
      state: "logon",
      screenIndex: 0,
      scroll: 0,
    });
  });

  const nextTerminalLink = computed<RouteLocationRaw | undefined>(() => {
    if (terminalIndex.value === 2 && levelIndex.value === 20) {
      return undefined;
    }
    return makeRoute({
      ...getNextTerminalRouteInfo(),
      state: "logon",
      screenIndex: 0,
      scroll: 0,
    });
  });

  const nextScreenLink = computed<RouteLocationRaw | null>(() => {
    if (
      levelIndex.value === 20 &&
      terminalIndex.value === 2 &&
      state.value === "logoff"
    ) {
      return null;
    }

    switch (state.value) {
      case "logon": {
        if (terminal.value.states.unfinished.length > 0) {
          return makeRoute({ state: "unfinished", screenIndex: 0, scroll: 0 });
        } else {
          return makeRoute({ state: "success", screenIndex: 0, scroll: 0 });
        }
      }
      case "unfinished": {
        if (screenIndex.value < terminal.value.states.unfinished.length - 1) {
          return makeRoute({ screenIndex: screenIndex.value + 1, scroll: 0 });
        }
        if (terminal.value.states.success) {
          return makeRoute({ state: "success", screenIndex: 0, scroll: 0 });
        }
        return makeRoute({ state: "logoff", screenIndex: 0, scroll: 0 });
      }
      case "success": {
        if (screenIndex.value < terminal.value.states.success!.length - 1) {
          return makeRoute({ screenIndex: screenIndex.value + 1, scroll: 0 });
        }
        return makeRoute({ state: "logoff", screenIndex: 0, scroll: 0 });
      }
      case "failure": {
        throw new Error("don't handle failure");
      }
      case "logoff": {
        return makeRoute({
          ...getNextTerminalRouteInfo(),
          state: "logon",
          screenIndex: 0,
          scroll: 0,
        });
      }
    }
  });

  const scrollPrevLink = computed<RouteLocationRaw>(() =>
    makeRoute({ scroll: scroll.value - 1 }),
  );
  const scrollNextLink = computed<RouteLocationRaw>(() =>
    makeRoute({ scroll: scroll.value + 1 }),
  );

  return {
    levelIndex,
    terminalIndex,
    state,
    screenIndex,
    scroll,
    level,
    terminal,
    scroller,
    levelLink,
    prevTerminalLink,
    nextTerminalLink,
    nextScreenLink,
    scrollPrevLink,
    scrollNextLink,
    groupType,
  };
}

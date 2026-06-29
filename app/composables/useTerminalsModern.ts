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
};

/** /:levelIndex/:terminalIndex?state=&screenindex=number&scroll=number */
export function useTerminalsModern(levels: Level[]) {
  const route = useRoute();

  const lang = computed(() => route.params.lang ?? "en");
  const levelIndex = computed(() => Number(route.params.levelIndex));
  const terminalIndex = computed(() => Number(route.params.terminalIndex));
  const state = computed<TerminalState>(
    () => (route.query.state as TerminalState) || "logon",
  );
  const screenIndex = computed(() => Number(route.query.screenindex ?? 0));

  const level = computed(
    () => levels.find((level) => level.index === levelIndex.value)!,
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
    console.log(info);
    return {
      path: `/modern/${lang.value}/${info.levelIndex ?? levelIndex.value}/${info.terminalIndex ?? terminalIndex.value}`,
      query: {
        state: info.state ?? state.value,
        screenindex: info.screenIndex ?? screenIndex.value,
      },
    };
  }

  const prevTerminalRouteInfo = computed<RouteInfo | null>(() => {
    if (terminalIndex.value === 0 && levelIndex.value === 0) {
      return null;
    }

    const lIndex =
      terminalIndex.value > 0
        ? levelIndex.value
        : levels[
            levels.findIndex((level) => level.index === levelIndex.value) - 1
          ]?.index;

    const tIndex =
      terminalIndex.value === 0
        ? levels[lIndex!]!.terminals.find(
            (t) => t.index === terminalIndex.value,
          )!.index
        : terminalIndex.value - 1;

    return {
      levelIndex: lIndex,
      screenIndex: 0,
      state: "logon",
      terminalIndex: tIndex,
    };
  });

  const nextTerminalRouteInfo = computed<RouteInfo | null>(() => {
    if (terminalIndex.value === 9 && levelIndex.value === 26) {
      return null;
    }

    const lastTerminalIndex = level.value.terminals.at(-1)!.index;

    const lIndex =
      terminalIndex.value === lastTerminalIndex
        ? levels[
            levels.findIndex((level) => level.index === levelIndex.value) + 1
          ]?.index
        : levelIndex.value;

    const tIndex =
      terminalIndex.value === lastTerminalIndex
        ? 0
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
    });
  }

  const prevTerminalLink = computed<RouteLocationRaw | null>(() => {
    // if (prevTerminalRouteInfo.value) {
    //   console.log(1);
    //   return makeRoute(prevTerminalRouteInfo.value);
    //   console.log(2);
    // }
    return null;
  });

  const nextTerminalLink = computed<RouteLocationRaw | null>(() => {
    if (terminalIndex.value === 2 && levelIndex.value === 20) {
      return null;
    }

    return makeRoute({
      ...getNextTerminalRouteInfo(),
      state: "logon",
      screenIndex: 0,
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
        if (terminal.value.states.success) {
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
        throw new Error("don't handle failure");
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

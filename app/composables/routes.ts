export type TerminalState =
  | "logon"
  | "unfinished"
  | "success"
  | "failure"
  | "logoff";

export type TerminalRouteInfo = {
  levelIndex?: number;
  terminalIndex?: number;
  state?: TerminalState;
  screenIndex?: number;
};

/** Routes to a chapter page instead of a terminal. */
export type ChapterRouteInfo = {
  chapterIndex: number;
};

/** Routes to End */
export type EndRouteInfo = {
  end: true;
};

export type RouteInfo = TerminalRouteInfo | ChapterRouteInfo | EndRouteInfo;

export function isChapterRouteInfo(info: RouteInfo): info is ChapterRouteInfo {
  return "chapterIndex" in info;
}

export function isEndRouteInfo(info: RouteInfo): info is EndRouteInfo {
  return "end" in info;
}

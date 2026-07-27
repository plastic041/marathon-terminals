import { describe, expect, it, vi } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { useTerminals } from "~/composables/useTerminals";
import type { GameId } from "~/games";

const { useRouteMock } = vi.hoisted(() => ({ useRouteMock: vi.fn() }));

mockNuxtImport("useRoute", () => useRouteMock);

function at(
  game: GameId,
  levelIndex: number,
  terminalIndex: number,
  query: Record<string, string> = {},
) {
  useRouteMock.mockReturnValue({
    params: {
      game,
      levelIndex: String(levelIndex),
      terminalIndex: String(terminalIndex),
    },
    query,
  });
  return useTerminals();
}

function terminalRoute(
  game: GameId,
  levelIndex: number,
  terminalIndex: number,
  state: string,
  screenindex: number,
) {
  return {
    path: `/${game}/${levelIndex}/${terminalIndex}`,
    query: { state, screenindex },
  };
}

describe("nextScreenLink", () => {
  it("logon -> unfinished", () => {
    expect(at("m1", 0, 0, { state: "logon" }).nextScreenLink.value).toEqual(
      terminalRoute("m1", 0, 0, "unfinished", 0),
    );
  });

  it("unfinished 없으면 logon -> success로 간다", () => {
    expect(at("m1", 10, 9, { state: "logon" }).nextScreenLink.value).toEqual(
      terminalRoute("m1", 10, 9, "success", 0),
    );
  });

  it("screenindex 증가", () => {
    expect(
      at("m1", 0, 0, { state: "unfinished", screenindex: "0" }).nextScreenLink
        .value,
    ).toEqual(terminalRoute("m1", 0, 0, "unfinished", 1));
    expect(
      at("m1", 0, 0, { state: "unfinished", screenindex: "2" }).nextScreenLink
        .value,
    ).toEqual(terminalRoute("m1", 0, 0, "unfinished", 3));
  });

  it("unfinished -> success(있으면)", () => {
    expect(
      at("m1", 5, 9, { state: "unfinished", screenindex: "0" }).nextScreenLink
        .value,
    ).toEqual(terminalRoute("m1", 5, 9, "success", 0));
  });

  it("unfinished -> logoff", () => {
    expect(
      at("m1", 0, 0, { state: "unfinished", screenindex: "3" }).nextScreenLink
        .value,
    ).toEqual(terminalRoute("m1", 0, 0, "logoff", 0));
  });

  it("success/failure -> logoff", () => {
    expect(
      at("m1", 5, 9, { state: "success", screenindex: "1" }).nextScreenLink
        .value,
    ).toEqual(terminalRoute("m1", 5, 9, "logoff", 0));
    expect(
      at("m1", 5, 9, { state: "failure", screenindex: "0" }).nextScreenLink
        .value,
    ).toEqual(terminalRoute("m1", 5, 9, "logoff", 0));
  });

  it("logoff -> screen X", () => {
    expect(at("m1", 0, 0, { state: "logoff" }).nextScreenLink.value).toBeNull();
    expect(at("m2", 0, 0, { state: "logoff" }).nextScreenLink.value).toBeNull();
  });
});

describe("nextTerminalRouteInfo", () => {
  it("다음 단말기 logon/0", () => {
    const t = at("m1", 0, 0, { state: "unfinished", screenindex: "2" });
    expect(t.nextTerminalRouteInfo.value).toEqual({
      levelIndex: 0,
      terminalIndex: 1,
      state: "logon",
      screenIndex: 0,
    });
    expect(t.nextTerminalLink.value).toEqual(
      terminalRoute("m1", 0, 1, "logon", 0),
    );
  });

  it("레벨 마지막 단말기 -> 다음 레벨 단말기 0", () => {
    expect(at("m1", 0, 9).nextTerminalRouteInfo.value).toEqual({
      levelIndex: 1,
      terminalIndex: 0,
      state: "logon",
      screenIndex: 0,
    });
  });

  it("챕터 마지막 단말기 -> 다음 챕터 페이지", () => {
    const t = at("m1", 2, 9);
    expect(t.nextTerminalRouteInfo.value).toEqual({ chapterIndex: 1 });
    expect(t.nextTerminalLink.value).toEqual({ path: "/m1/1" });
  });

  it("게임 마지막 단말기 -> end", () => {
    const m1 = at("m1", 26, 9);
    expect(m1.nextTerminalRouteInfo.value).toEqual({ end: true });
    expect(m1.nextTerminalLink.value).toEqual({ path: "/m1/end" });

    const m2 = at("m2", 27, 1);
    expect(m2.nextTerminalRouteInfo.value).toEqual({ end: true });
    expect(m2.nextTerminalLink.value).toEqual({ path: "/m2/end" });
  });
});

describe("prevTerminalRouteInfo", () => {
  it("이전 단말기", () => {
    const t = at("m1", 0, 2);
    expect(t.prevTerminalRouteInfo.value).toEqual({
      levelIndex: 0,
      terminalIndex: 1,
      state: "logon",
      screenIndex: 0,
    });
    expect(t.prevTerminalLink.value).toEqual(
      terminalRoute("m1", 0, 1, "logon", 0),
    );
  });

  it("레벨 첫 단말기 -> 이전 레벨 마지막 단말기", () => {
    expect(at("m1", 1, 0).prevTerminalRouteInfo.value).toEqual({
      levelIndex: 0,
      terminalIndex: 9,
      state: "logon",
      screenIndex: 0,
    });
  });

  it("챕터 첫 단말기 -> 챕터 페이지", () => {
    const first = at("m1", 0, 0);
    expect(first.prevTerminalRouteInfo.value).toEqual({ chapterIndex: 0 });
    expect(first.prevTerminalLink.value).toEqual({ path: "/m1/0" });

    const t = at("m1", 3, 0);
    expect(t.prevTerminalRouteInfo.value).toEqual({ chapterIndex: 1 });
    expect(t.prevTerminalLink.value).toEqual({ path: "/m1/1" });
  });
});

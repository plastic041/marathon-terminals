import { describe, expect, it, vi } from "vitest";
import { defineComponent, h } from "vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { PopoverRoot } from "reka-ui";
import Nav from "~/components/nav.vue";
import { GAMES, type GameId } from "~/games";

const { useRouteMock } = vi.hoisted(() => ({ useRouteMock: vi.fn() }));

mockNuxtImport("useRoute", () => useRouteMock);

const NavHost = defineComponent({
  setup: () => () => h(PopoverRoot, null, { default: () => h(Nav) }),
});

async function mountNav(game: GameId) {
  useRouteMock.mockReturnValue({
    params: { game, levelIndex: "0", terminalIndex: "0" },
    query: {},
  });
  const wrapper = await mountSuspended(NavHost);
  const hrefs = wrapper.findAll("a").map((a) => a.attributes("href")!);
  return { wrapper, hrefs };
}

describe("nav", () => {
  it("/m1 링크", async () => {
    const { hrefs } = await mountNav("m1");

    expect(hrefs.length).toBeGreaterThan(0);
    expect(hrefs.every((href) => href.startsWith("/m1"))).toBe(true);
    expect(hrefs.at(0)).toBe("/m1");
    expect(hrefs.at(-1)).toBe("/m1/end");
  });

  it("/m2 링크", async () => {
    const { hrefs } = await mountNav("m2");

    expect(hrefs.every((href) => href.startsWith("/m2"))).toBe(true);
    expect(hrefs.at(0)).toBe("/m2");
    expect(hrefs.at(-1)).toBe("/m2/end");
  });

  it("현재 게임의 챕터/레벨/단말기 목록 모두 보여주기", async () => {
    const { wrapper, hrefs } = await mountNav("m2");
    const chapters = GAMES.m2.chapters;
    const levels = chapters.flatMap((c) => c.levels);

    for (const chapter of chapters) {
      expect(hrefs).toContain(`/m2/${chapter.index}`);
      expect(wrapper.text()).toContain(chapter.name);
    }

    const terminalCount = levels.flatMap((l) => l.terminals).length;

    expect(hrefs.length).toBeGreaterThan(terminalCount);
    expect(hrefs).toContain("/m2/0/0?state=logon");
  });
});

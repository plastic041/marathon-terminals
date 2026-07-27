import { describe, expect, it, vi } from "vitest";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import Map from "~/components/map.vue";
import { MAPS } from "~/games/maps";
import type { GameId } from "~/games";

const { useRouteMock } = vi.hoisted(() => ({ useRouteMock: vi.fn() }));

mockNuxtImport("useRoute", () => useRouteMock);

async function mountMap(game: GameId, index: number) {
  useRouteMock.mockReturnValue({ params: { game }, query: {} });
  return await mountSuspended(Map, { props: { index } });
}

describe("map", () => {
  it("m1은 레벨 지도를 그린다", async () => {
    const wrapper = await mountMap("m1", 0);
    expect(wrapper.find("svg").exists()).toBe(true);
  });

  it("viewBox를 넘겨받아 svg에 반영한다", async () => {
    useRouteMock.mockReturnValue({ params: { game: "m1" }, query: {} });
    const wrapper = await mountSuspended(Map, {
      props: { index: 0, viewBox: "1 2 3 4" },
    });
    expect(wrapper.find("svg").attributes("viewBox")).toBe("1 2 3 4");
  });

  it("지도가 없는 레벨에서는 아무것도 그리지 않는다", async () => {
    // m1 레벨 16, 18, 19는 지도가 없다.
    const wrapper = await mountMap("m1", 16);
    expect(wrapper.find("svg").exists()).toBe(false);
  });

  it("m2는 지도가 없으므로 아무것도 그리지 않는다", async () => {
    expect(Object.keys(MAPS.m2)).toHaveLength(0);
    const wrapper = await mountMap("m2", 0);
    expect(wrapper.find("svg").exists()).toBe(false);
  });
});

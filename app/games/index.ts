import type { Chapter } from "~/types/terminal";
import m1Data from "~/texts/m1/terminals.yaml";
import m2Data from "~/texts/m2/terminals.yaml";
import { texts as m1Texts } from "~/texts/m1/texts";
import { texts as m2Texts } from "~/texts/m2/texts";

export const GAME_IDS = ["m1", "m2"] as const;

export type GameId = (typeof GAME_IDS)[number];

export const DEFAULT_GAME_ID: GameId = "m1";

export type GameTexts = {
  introLabel: string;
  finalScreenLabel: string;
  title: string;
  intro: string;
};

export type Game = {
  id: GameId;
  chapters: Chapter[];
  texts: GameTexts;
  /** 챕터 표지 이미지 */
  chapterImage: (chapterIndex: number) => string | null;
};

export const GAMES: Record<GameId, Game> = {
  m1: {
    id: "m1",
    chapters: m1Data.chapters as Chapter[],
    texts: m1Texts,
    chapterImage: (chapterIndex) => `/chapters/${chapterIndex}.gif`,
  },
  m2: {
    id: "m2",
    chapters: m2Data.chapters as Chapter[],
    texts: m2Texts,
    chapterImage: () => null,
  },
};

export function isGameId(value: unknown): value is GameId {
  return GAME_IDS.includes(value as GameId);
}

import { DEFAULT_GAME_ID, GAMES, isGameId, type GameId } from "~/games";

/** m1, m2 구분 */
export function useGame() {
  const route = useRoute();

  const gameId = computed<GameId>(() => {
    const id = route.params.game;
    return isGameId(id) ? id : DEFAULT_GAME_ID;
  });

  const game = computed(() => GAMES[gameId.value]);
  const chapters = computed(() => game.value.chapters);
  const texts = computed(() => game.value.texts);

  return { gameId, game, chapters, texts };
}

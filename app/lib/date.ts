import { Temporal, Intl } from "@js-temporal/polyfill";

const BASE = Temporal.PlainDateTime.from("1995-08-24T22:42:17");

export function getGameCurrentDateTime(
  start: Temporal.PlainDateTime,
  now: Temporal.PlainDateTime,
): Temporal.PlainDateTime {
  const secondsDiff = now.since(start).total("seconds");

  const gameCurrent = BASE.add(
    Temporal.Duration.from({ seconds: secondsDiff * 420 }),
  ).with({ year: 2337 });

  return gameCurrent;
}

const DATETIME_FORAMTTER = Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
  hour12: false,
});

/**
 * %H%M %m.%d.%Y
 */
export function format(dt: Temporal.PlainDateTime): string {
  const parts = DATETIME_FORAMTTER.formatToParts(dt);
  const [month, , day, , year, , hour, , minute] = parts.map((p) => p.value);

  return `${hour}${minute}, ${month}.${day}.${year}`;
}

// test
const gc = getGameCurrentDateTime(
  Temporal.PlainDateTime.from("2022-06-06T00:00:00"),
  Temporal.PlainDateTime.from("2022-06-06T00:00:00"),
);
console.log(format(gc));

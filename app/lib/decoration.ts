function bold(original: string): string {
  return original
    .replaceAll("$B", "<strong>")
    .replaceAll("$b", "</strong>")
    .replace(/<strong>((?:(?!<\/strong>).*)?)(\n|$)/g, "<strong>$1</strong>$2");
}

function italic(original: string): string {
  return original
    .replaceAll("$I", "<i>")
    .replaceAll("$i", "</i>")
    .replace(/<i>((?:(?!<\/i>).*)?)(\n|$)/g, "<i>$1</i>$2");
}

function underline(original: string): string {
  return original
    .replaceAll("$U", "<span class='underline'>")
    .replaceAll("$u", "</span>")
    .replace(
      /<span class='underline'>((?:(?!<\/span>).*)?)(\n|$)/g,
      "<span class='underline'>$1</span>$2",
    );
}

function escapeHtml(original: string): string {
  return original
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function decorate(original: string): string {
  return bold(italic(underline(escapeHtml(original))));
}

const OPEN_MARKERS = ["$B", "$I", "$U"];
const CLOSE_MARKERS = ["$b", "$i", "$u"];
const MARKERS = [...OPEN_MARKERS, ...CLOSE_MARKERS];

export function undeco(original: string): string {
  return original
    .replaceAll("$B", "")
    .replaceAll("$b", "")
    .replaceAll("$I", "")
    .replaceAll("$i", "")
    .replaceAll("$U", "")
    .replaceAll("$u", "");
}

export function redeco(original: string, lineTexts: string[]): string[] {
  const offsetMap: number[] = [];
  for (let i = 0; i < original.length; ) {
    if (MARKERS.includes(original.slice(i, i + 2))) {
      i += 2;
      continue;
    }
    offsetMap.push(i);
    i += 1;
  }
  offsetMap.push(original.length);

  const undecoed = undeco(original);
  const result: string[] = [];
  let cursor = 0;
  for (const text of lineTexts) {
    const found = undecoed.indexOf(text, cursor);
    const start = found < 0 ? cursor : found;
    const end = start + text.length;
    cursor = end;

    let lo = offsetMap[start]!;
    let hi = end > start ? offsetMap[end - 1]! + 1 : offsetMap[start]!;

    while (lo >= 2 && OPEN_MARKERS.includes(original.slice(lo - 2, lo))) {
      lo -= 2;
    }
    while (
      hi + 2 <= original.length &&
      CLOSE_MARKERS.includes(original.slice(hi, hi + 2))
    ) {
      hi += 2;
    }

    result.push(original.slice(lo, hi));
  }
  return result;
}

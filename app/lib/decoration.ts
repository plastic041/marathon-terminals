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

export function decoration(original: string): string {
  return bold(italic(underline(escapeHtml(original))));
}

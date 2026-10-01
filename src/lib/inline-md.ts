// The smallest Markdown the data files need: `code` and [text](url). Everything
// else is escaped, so data can never inject markup.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function inlineMd(src: string): string {
  return esc(src)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(((?:https:\/\/|\/)[^)\s]+)\)/g, '<a href="$2">$1</a>');
}

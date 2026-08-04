/** Strip tags for PDF/plain text; collapses whitespace. */
export function htmlToPlainText(html: string): string {
  if (!html?.trim()) return "";
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

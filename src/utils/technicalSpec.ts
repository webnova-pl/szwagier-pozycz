export interface TechnicalSpecRow {
  key: string;
  value: string;
}

/** Inline "Key | Value, ..." / CMS HTML variants — same rules as on product page. */
export function parseInlineTechnicalSpec(
  technicalSpec: string,
): TechnicalSpecRow[] | null {
  const plainText = technicalSpec
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!plainText.includes("|")) {
    return null;
  }

  let content = plainText.replace(/^specyfikacja\s*:?\s*/i, "").trim();
  const firstDash = content.indexOf("-");
  const lastDash = content.lastIndexOf("-");
  if (firstDash !== -1 && lastDash > firstDash) {
    content = content.slice(firstDash + 1, lastDash).trim();
  }

  const rows = content
    .split(/\s*,\s*/)
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row) => {
      const separatorIndex = row.indexOf("|");
      if (separatorIndex === -1) {
        return null;
      }

      const key = row.slice(0, separatorIndex).trim();
      const value = row.slice(separatorIndex + 1).trim();

      if (!key || !value) {
        return null;
      }

      return { key, value };
    })
    .filter((row): row is TechnicalSpecRow => row !== null);

  return rows.length > 0 ? rows : null;
}

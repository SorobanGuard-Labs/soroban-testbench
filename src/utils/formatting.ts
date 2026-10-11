export function formatStroops(stroops: number): string {
  return `${(stroops / 10_000_000).toFixed(7)} XLM`;
}

export function shortId(value: string, prefix = 8, suffix = 6): string {
  if (value.length <= prefix + suffix + 3) {
    return value;
  }

  return `${value.slice(0, prefix)}...${value.slice(-suffix)}`;
}

export function sentenceCase(value: string): string {
  return value.replaceAll("_", " ").replace(/^\w/, (letter) => letter.toUpperCase());
}

export function escapeCsvField(value: unknown): string {
  if (value === null || value === undefined) {
    return '""';
  }
  const str = String(value).replaceAll('"', '""');
  return `"${str}"`;
}

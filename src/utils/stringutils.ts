export function pluralizeIfArray(value: unknown): string {
  return Array.isArray(value) ? 's' : '';
}

export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
}

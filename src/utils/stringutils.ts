export function pluralizeIfArray(value: unknown): string {
  return Array.isArray(value) ? 's' : '';
}

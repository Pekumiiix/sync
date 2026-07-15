export function pluralizeIfArray(value: unknown): string {
  return Array.isArray(value) ? 's' : '';
}

export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
}

export function getInitials(name: string): string {
  const names = name.trim().split(' ');

  const firstName = names[0] || '';
  const lastName = names.slice(1).join(' ') || '';

  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

  return initials || name.charAt(0).toUpperCase();
}

export function computeUserName(firstName?: string, lastName?: string): string {
  return (firstName || '') + ' ' + (lastName || '');
}

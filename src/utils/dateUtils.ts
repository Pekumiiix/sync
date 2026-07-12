export interface RelativeTimeOptions {
  /** * Formatting style for the relative time.
   * Examples (using 10 seconds):
   * - 'long': "10 seconds ago"
   * - 'short': "10 sec. ago"
   * - 'narrow': "10s ago"
   */
  style?: 'long' | 'short' | 'narrow';
  /** Fallback string if date is invalid or null */
  fallback?: string;
}

export function timeAgo(dateString: string | null, options: RelativeTimeOptions = {}): string {
  if (!dateString) return options.fallback || 'Never';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) throw new Error('Invalid date');

    const diffInSeconds = (date.getTime() - Date.now()) / 1000;
    const absDiff = Math.abs(diffInSeconds);

    const rtf = new Intl.RelativeTimeFormat('en', {
      numeric: 'auto',
      style: options.style || 'narrow'
    });

    // Custom override for immediate times
    if (absDiff < 60) return 'Just now';

    // Minutes
    if (absDiff < 3600) {
      return rtf.format(Math.round(diffInSeconds / 60), 'minute');
    }
    // Hours
    if (absDiff < 86400) {
      return rtf.format(Math.round(diffInSeconds / 3600), 'hour');
    }
    // Days
    if (absDiff < 2592000) {
      // 30 days
      return rtf.format(Math.round(diffInSeconds / 86400), 'day');
    }
    // Months
    if (absDiff < 31536000) {
      // 365 days
      return rtf.format(Math.round(diffInSeconds / 2592000), 'month');
    }
    // Years
    return rtf.format(Math.round(diffInSeconds / 31536000), 'year');
  } catch {
    return options.fallback || 'Unknown';
  }
}

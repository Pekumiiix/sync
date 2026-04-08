const browserImageConfig: Record<string, string> = {
  chrome: '/images/app/browsers/chrome.png',
  edge: '/images/app/browsers/edge.png',
  firefox: '/images/app/browsers/firefox.png',
  opera: '/images/app/browsers/opera.png',
  arc: '/images/app/browsers/arc.png',
  brave: '/images/app/browsers/brave.png'
};

export const getBrowserImage = (browserName: string): string | undefined => {
  const normalizedName = browserName.toLowerCase();

  return browserImageConfig[normalizedName] || undefined;
};

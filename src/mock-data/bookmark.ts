import type { IBookmarkCard } from '@/types/app.type';

export const bookmarks: IBookmarkCard[] = [
  {
    id: crypto.randomUUID(),
    platform: 'GitHub',
    link: 'www.github.com',
    collection: 'unsorted',
    time: '9:15 AM',
    image: '/images/app/bookmarks/image.png',
    isPinned: true,
    tags: ['code', 'git', 'hosting'],
    description:
      'Where the world builds software. The complete developer platform to build, scale, and deliver secure software.'
  },
  {
    id: crypto.randomUUID(),
    platform: 'Figma',
    link: 'www.figma.com',
    collection: 'unsorted',
    time: '10:30 AM',
    image: '/images/app/bookmarks/image.png',
    isPinned: true,
    tags: ['design', 'ui', 'prototyping'],
    description: 'The collaborative interface design tool. Build better products as a team.'
  },
  {
    id: crypto.randomUUID(),
    platform: 'Stack Overflow',
    link: 'www.stackoverflow.com',
    collection: 'unsorted',
    time: '11:45 AM',
    image: '/images/app/bookmarks/image.png',
    isPinned: true,
    tags: ['help', 'code', 'q&a'],
    description:
      'A public platform building the definitive collection of coding questions & answers.'
  },
  {
    id: crypto.randomUUID(),
    platform: 'YouTube',
    link: 'www.youtube.com',
    collection: 'unsorted',
    time: '1:20 PM',
    image: '/images/app/bookmarks/image.png',
    isPinned: true,
    tags: ['video', 'learning', 'entertainment'],
    description:
      'Enjoy the videos and music you love, upload original content, and share it all with the world.'
  },
  {
    id: crypto.randomUUID(),
    platform: 'Reddit',
    link: 'www.reddit.com',
    collection: 'unsorted',
    time: '2:10 PM',
    image: '/images/app/bookmarks/image.png',
    isPinned: false,
    tags: ['forum', 'community', 'news'],
    description: 'Dive into anything. The front page of the internet with thousands of communities.'
  },
  {
    id: crypto.randomUUID(),
    platform: 'LinkedIn',
    link: 'www.linkedin.com',
    collection: 'unsorted',
    time: '3:05 PM',
    image: '/images/app/bookmarks/image.png',
    isPinned: false,
    tags: ['social', 'career', 'networking'],
    description:
      'Manage your professional identity. Build and engage with your professional network.'
  },
  {
    id: crypto.randomUUID(),
    platform: 'Medium',
    link: 'www.medium.com',
    collection: 'unsorted',
    time: '4:40 PM',
    image: '/images/app/bookmarks/image.png',
    isPinned: false,
    tags: ['blog', 'reading', 'articles'],
    description:
      'Where good ideas find you. Read and share new perspectives on just about any topic.'
  },
  {
    id: crypto.randomUUID(),
    platform: 'Notion',
    link: 'www.notion.so',
    collection: 'unsorted',
    time: '5:15 PM',
    image: '/images/app/bookmarks/image.png',
    isPinned: false,
    tags: ['notes', 'productivity', 'workspace'],
    description:
      'The connected workspace where better, faster work happens. Your wiki, docs, & projects.'
  },
  {
    id: crypto.randomUUID(),
    platform: 'Dribbble',
    link: 'www.dribbble.com',
    collection: 'unsorted',
    time: '6:30 PM',
    image: '/images/app/bookmarks/image.png',
    isPinned: false,
    tags: ['design', 'inspiration', 'portfolio'],
    description:
      'Discover the world’s top designers & creatives. The leading destination to find & showcase creative work.'
  },
  {
    id: crypto.randomUUID(),
    platform: 'Vercel',
    link: 'www.vercel.com',
    collection: 'unsorted',
    time: '8:00 PM',
    image: '/images/app/bookmarks/image.png',
    isPinned: false,
    tags: ['hosting', 'deployment', 'frontend'],
    description: 'The Frontend Cloud. Build, scale, and secure a faster, personalized web.'
  }
];

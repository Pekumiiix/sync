import type { IBookmarksResponse } from '@/types/bookmark.type';

export const mockBookmarksResponse: IBookmarksResponse = {
  pinned: [
    {
      id: 'bm_p001',
      title: 'Figma - Collaborative interface design',
      description:
        'Figma is the leading collaborative design tool for building meaningful products.',
      url: 'https://www.figma.com/file/xyz123',
      domain: 'www.figma.com',
      websiteName: 'Figma',
      folderName: 'Design Systems',
      createdAt: '2023-10-26T09:15:00Z',
      isPinned: true,
      tags: ['ui', 'ux', 'prototyping'],
      coverImageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      faviconUrl: 'https://www.figma.com/favicon.ico',
      addedBy: {
        name: 'Sarah Jenkins',
        avatarUrl: 'https://i.pravatar.cc/150?u=sarah'
      }
    },
    {
      id: 'bm_p002',
      title: 'GitHub - CodeSmith Repository',
      description: 'Core engine and backend services for the CodeSmith platform.',
      url: 'https://github.com/codesmith/core-engine',
      domain: 'github.com',
      websiteName: 'GitHub',
      folderName: 'Engineering',
      createdAt: '2023-10-25T14:22:00Z',
      isPinned: true,
      tags: ['source-control', 'backend', 'release'],
      coverImageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80',
      faviconUrl: 'https://github.githubassets.com/favicons/favicon.png',
      addedBy: {
        name: 'Alex Chen',
        avatarUrl: 'https://i.pravatar.cc/150?u=alex'
      }
    },
    {
      id: 'bm_p003',
      title: 'Vercel Dashboard',
      description: null,
      url: 'https://vercel.com/dashboard/projects',
      domain: 'vercel.com',
      websiteName: 'Vercel',
      folderName: 'Infrastructure',
      createdAt: '2023-10-24T11:05:00Z',
      isPinned: true,
      tags: ['hosting', 'ci-cd', 'frontend'],
      coverImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      faviconUrl: 'https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/favicon.ico',
      addedBy: {
        name: 'Marcus Weaver',
        avatarUrl: 'https://i.pravatar.cc/150?u=marcus'
      }
    },
    {
      id: 'bm_p004',
      title: 'Notion - Q4 Product Roadmap',
      description: 'Strategic planning and feature rollout schedule for Q4.',
      url: 'https://www.notion.so/Q4-Roadmap-8a7b6c5d',
      domain: 'www.notion.so',
      websiteName: 'Notion',
      folderName: 'Management',
      createdAt: '2023-10-23T16:45:00Z',
      isPinned: true,
      tags: ['planning', 'strategy', 'q4'],
      coverImageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
      faviconUrl: 'https://www.notion.so/images/favicon.ico',
      addedBy: {
        name: 'Elena Rodriguez',
        avatarUrl: 'https://i.pravatar.cc/150?u=elena'
      }
    },
    {
      id: 'bm_p005',
      title: 'Linear - Issue Tracker',
      description: 'Engineering team sprint board and issue tracking.',
      url: 'https://linear.app/codesmith/team/ENG/all',
      domain: 'linear.app',
      websiteName: 'Linear',
      folderName: 'Engineering',
      createdAt: '2023-10-22T08:30:00Z',
      isPinned: true,
      tags: ['tickets', 'sprints', 'agile'],
      coverImageUrl: 'https://images.unsplash.com/photo-1507925922837-326f12d9348d?w=800&q=80',
      faviconUrl: 'https://linear.app/favicon.ico',
      addedBy: {
        name: 'Alex Chen',
        avatarUrl: 'https://i.pravatar.cc/150?u=alex'
      }
    }
  ],
  data: [
    {
      id: 'bm_u001',
      title: 'Vue.js Documentation - Composition API',
      description: 'Frequently asked questions about the Vue 3 Composition API.',
      url: 'https://vuejs.org/guide/extras/composition-api-faq.html',
      domain: 'vuejs.org',
      websiteName: 'Vue.js',
      folderName: 'Documentation',
      createdAt: '2023-10-27T10:00:00Z',
      isPinned: false,
      tags: ['vue', 'frontend', 'docs'],
      coverImageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80',
      faviconUrl: 'https://vuejs.org/logo.svg',
      addedBy: {
        name: 'Sarah Jenkins',
        avatarUrl: 'https://i.pravatar.cc/150?u=sarah'
      }
    },
    {
      id: 'bm_u002',
      title: 'Tailwind CSS Configuration',
      description: 'A guide to configuring and customizing your Tailwind installation.',
      url: 'https://tailwindcss.com/docs/configuration',
      domain: 'tailwindcss.com',
      websiteName: 'Tailwind CSS',
      folderName: 'Documentation',
      createdAt: '2023-10-26T14:15:00Z',
      isPinned: false,
      tags: ['css', 'styling', 'config'],
      coverImageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
      faviconUrl: 'https://tailwindcss.com/favicons/favicon.ico',
      addedBy: {
        name: 'Marcus Weaver',
        avatarUrl: 'https://i.pravatar.cc/150?u=marcus'
      }
    },
    {
      id: 'bm_u003',
      title: 'Stripe API Reference - Payment Intents',
      description: null,
      url: 'https://stripe.com/docs/api/payment_intents',
      domain: 'stripe.com',
      websiteName: 'Stripe',
      folderName: 'Backend Integrations',
      createdAt: '2023-10-25T09:45:00Z',
      isPinned: false,
      tags: ['payments', 'api', 'fintech'],
      coverImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      faviconUrl: 'https://stripe.com/favicon.ico',
      addedBy: {
        name: 'Elena Rodriguez',
        avatarUrl: 'https://i.pravatar.cc/150?u=elena'
      }
    },
    {
      id: 'bm_u004',
      title: 'MDN Web Docs: CSS Grid Layout',
      description: 'CSS Grid Layout excels at dividing a page into major regions.',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout',
      domain: 'developer.mozilla.org',
      websiteName: 'MDN',
      folderName: 'Resources',
      createdAt: '2023-10-24T13:20:00Z',
      isPinned: false,
      tags: ['css', 'layout', 'reference'],
      coverImageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      faviconUrl: 'https://developer.mozilla.org/favicon-48x48.png',
      addedBy: {
        name: 'Alex Chen',
        avatarUrl: 'https://i.pravatar.cc/150?u=alex'
      }
    },
    {
      id: 'bm_u005',
      title: 'Supabase - Postgres Database',
      description: 'Every Supabase project comes with a full Postgres database.',
      url: 'https://supabase.com/docs/guides/database',
      domain: 'supabase.com',
      websiteName: 'Supabase',
      folderName: 'Backend Integrations',
      createdAt: '2023-10-23T11:10:00Z',
      isPinned: false,
      tags: ['database', 'sql', 'baas'],
      coverImageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
      faviconUrl: 'https://supabase.com/favicon/favicon.ico',
      addedBy: {
        name: 'Sarah Jenkins',
        avatarUrl: 'https://i.pravatar.cc/150?u=sarah'
      }
    },
    {
      id: 'bm_u006',
      title: 'TypeScript Handbook - Utility Types',
      description:
        'TypeScript provides several utility types to facilitate common type transformations.',
      url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
      domain: 'www.typescriptlang.org',
      websiteName: 'TypeScript',
      folderName: 'Documentation',
      createdAt: '2023-10-22T15:30:00Z',
      isPinned: false,
      tags: ['typescript', 'types', 'learning'],
      coverImageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80',
      faviconUrl: 'https://www.typescriptlang.org/favicon.ico',
      addedBy: {
        name: 'Marcus Weaver',
        avatarUrl: 'https://i.pravatar.cc/150?u=marcus'
      }
    },
    {
      id: 'bm_u007',
      title: 'AWS S3 Pricing Calculator',
      description: null,
      url: 'https://calculator.aws/#/createCalculator/S3',
      domain: 'calculator.aws',
      websiteName: 'AWS',
      folderName: 'Infrastructure',
      createdAt: '2023-10-21T10:05:00Z',
      isPinned: false,
      tags: ['aws', 'cloud', 'budget'],
      coverImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      faviconUrl: 'https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico',
      addedBy: {
        name: 'Elena Rodriguez',
        avatarUrl: 'https://i.pravatar.cc/150?u=elena'
      }
    },
    {
      id: 'bm_u008',
      title: 'Docker Compose File Reference',
      description: 'The Compose file is a YAML file defining services, networks, and volumes.',
      url: 'https://docs.docker.com/compose/compose-file/',
      domain: 'docs.docker.com',
      websiteName: 'Docker',
      folderName: 'Infrastructure',
      createdAt: '2023-10-20T09:50:00Z',
      isPinned: false,
      tags: ['docker', 'devops', 'containers'],
      coverImageUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80',
      faviconUrl: 'https://docs.docker.com/favicon.ico',
      addedBy: {
        name: 'Alex Chen',
        avatarUrl: 'https://i.pravatar.cc/150?u=alex'
      }
    },
    {
      id: 'bm_u009',
      title: 'React Query v5 Migration Guide',
      description: 'Learn how to migrate your Vue or React application to TanStack Query v5.',
      url: 'https://tanstack.com/query/latest/docs/vue/guides/migrating-to-v5',
      domain: 'tanstack.com',
      websiteName: 'TanStack',
      folderName: 'Documentation',
      createdAt: '2023-10-19T14:40:00Z',
      isPinned: false,
      tags: ['vue-query', 'state', 'migration'],
      coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      faviconUrl: 'https://tanstack.com/favicon.ico',
      addedBy: {
        name: 'Sarah Jenkins',
        avatarUrl: 'https://i.pravatar.cc/150?u=sarah'
      }
    },
    {
      id: 'bm_u010',
      title: 'Zod - TypeScript-first schema validation',
      description: 'Zod is a TypeScript-first schema declaration and validation library.',
      url: 'https://zod.dev/',
      domain: 'zod.dev',
      websiteName: 'Zod',
      folderName: 'Resources',
      createdAt: '2023-10-18T16:15:00Z',
      isPinned: false,
      tags: ['validation', 'typescript', 'library'],
      coverImageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?w=800&q=80',
      faviconUrl: 'https://zod.dev/favicon.ico',
      addedBy: {
        name: 'Marcus Weaver',
        avatarUrl: 'https://i.pravatar.cc/150?u=marcus'
      }
    }
  ],
  meta: {
    totalCount: 15,
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false
  }
};

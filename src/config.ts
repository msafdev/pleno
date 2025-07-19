import type { ThemeConfig } from '@/types/config.type'

export const themeConfig: ThemeConfig = {
  site: {
    website: 'http://localhost:4321',
    title: 'Pleno',
    author: {
      name: 'Msafdev',
      avatarUrl: 'http://github.com/msafdev.png',
      role: 'Product Engineer'
    },
    description: 'Minimal blog built by Astro and Chiri',
    language: 'en-US'
  },
  general: {
    themeToggle: true,
    footer: true,
    clientRouter: false // Only works on Edge and Chrome
  },
  date: {
    dateFormat: 'DAY MONTH YYYY',
    dateSeparator: '.'
  },
  post: {
    readingTime: true,
    authorProfile: true,
    toc: true,
    imageViewer: true,
    copyCode: true
  }
}

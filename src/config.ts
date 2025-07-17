import type { ThemeConfig } from '@/types/config.type'

export const themeConfig: ThemeConfig = {
  site: {
    website: 'http://localhost:4321',
    title: 'Pleno',
    author: 'Msafdev',
    description: 'Minimal blog built by Astro and Chiri',
    language: 'en-US'
  },
  general: {
    themeToggle: false,
    footer: true,
    clientRouter: false // Only works on Edge and Chrome
  },
  date: {
    dateFormat: 'DAY MONTH YYYY',
    dateSeparator: '.',
    dateOnRight: true
  },
  post: {
    readingTime: true,
    toc: true,
    imageViewer: true,
    copyCode: true
  }
}

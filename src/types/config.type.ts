// Date format types
export type DateFormat =
  | 'YYYY-MM-DD'
  | 'MM-DD-YYYY'
  | 'DD-MM-YYYY'
  | 'MONTH DAY YYYY'
  | 'DAY MONTH YYYY'

// Site info configuration type
export interface SiteInfo {
  website: string
  title: string
  author: { name: string; avatarUrl?: string; role?: string }
  description: string
  language: string
}

// General settings configuration type
export interface GeneralSettings {
  clientRouter: boolean
  themeToggle: boolean
  footer: boolean
}

// Date settings configuration type
export interface DateSettings {
  dateFormat: DateFormat
  dateSeparator: string
}

// Post settings configuration type
export interface PostSettings {
  readingTime: boolean
  toc: boolean
  imageViewer: boolean
  authorProfile: boolean
  copyCode: boolean
}

// Theme configuration type
export interface ThemeConfig {
  site: SiteInfo
  general: GeneralSettings
  date: DateSettings
  post: PostSettings
}

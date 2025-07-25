import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: () =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      image: z.string().optional()
    })
})

const paragraphs = defineCollection({
  loader: glob({ base: './src/content/paragraphs', pattern: '**/*.{md,mdx}' }),
  schema: () =>
    z.object({
      title: z.string()
    })
})

export const collections = { posts, paragraphs }

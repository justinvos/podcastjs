declare module 'podcastjs'

interface Podcast {
  title: string
  date: string
  description: string
  episodes: Episode[]

  url?: string
  image?: string
}

interface Episode {
  index: number
  title: string
  date: string
  description: string
  audio: string

  image?: string
}

interface ParseError extends Error {}
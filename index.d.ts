declare module 'podcastjs'

interface Podcast {
  title: string | null
  date: Date | null
  description: string | null
  episodes: Episode[]
  image: string | null
}

interface Episode {
  index: number
  title: string | null
  guid: string | null
  date: Date | null
  description: string | null
  audio: string | null

  image: string | null
}

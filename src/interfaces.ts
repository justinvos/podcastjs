export interface Podcast {
  title: string
  date: string
  description: string
  episodes: Episode[]

  url?: string
  image?: string
}

export interface Episode {
  index: number
  title: string
  date: string
  description: string
  image: string
  audio: string
}

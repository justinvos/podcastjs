import fetch from 'cross-fetch'

import { parsePodcast } from './parse'

export async function fetchPodcast (url: string): Promise<Podcast> {
  const response = await fetch(url)
  const body = await response.text()

  return parsePodcast(body)
}

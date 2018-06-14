import fetch from 'node-fetch'
//import { Podcast } from './interfaces'
import { parsePodcast } from './parse'

export function fetchPodcast (url: string): Promise<Podcast> {
  return fetch(url)
    .then((res: any) => res.text())
    .then(parsePodcast)
}

export default fetchPodcast
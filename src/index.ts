import fetch from 'node-fetch'
import { Podcast } from './interfaces'
import { parsePodcast } from './parse'

export function fetchPodcast (url: string): Promise<Podcast> {
  return fetch(url)
    .then((res: any) => res.text())
    .then(parsePodcast)
}

const hiFeed = 'http://www.hellointernet.fm/podcast?format=rss'
//const cortexFeed = 'https://www.relay.fm/cortex/feed'

fetchPodcast(hiFeed)

import xmlJs from 'xml-js'
import { Podcast, Episode } from './interfaces'

export function parsePodcast (text: string): Podcast {
  const podcastRss: any = xmlJs.xml2js(text, {compact: true});
  const channel = podcastRss.rss.channel

  const podcast: Podcast = {
    title: parsePodcastTitle(channel),
    date: parsePodcastDate(channel),
    description: parsePodcastDescription(channel),
    episodes: podcastRss.rss.channel.item.map(parseEpisode)
  }

  return podcast
}

export function parsePodcastTitle (channel: any): string {
  return channel.title._text
}

export function parsePodcastDate (channel: any): string {
  if (channel.pubDate) {
    return channel.pubDate._text
  } else if (channel.lastBuildDate) {
    return channel.lastBuildDate._text
  } else {
    throw new Error('Could not parse Podcast.date')
  }
}

export function parsePodcastDescription (channel: any): string {
  return channel.description._text
}

export function parseEpisode (item: any, index: number): Episode {
  const episode: Episode = {
    index,
    title: parseEpisodeTitle(item),
    date: parseEpisodeDate(item),
    description: parseEpisodeDescription(item),
    image: parseEpisodeImage(item),
    audio: parseEpisodeAudio(item)
  }
  return episode
}

export function parseEpisodeTitle (item: any): string {
  return item.title._text
}

export function parseEpisodeDate (item: any): string {
  return item.pubDate._text
}

export function parseEpisodeDescription (item: any): string {
  return item.description._cdata
}

export function parseEpisodeImage (item: any): string {
  return item['itunes:image']._attributes.href
}

export function parseEpisodeAudio (item: any): string {
  return item.enclosure._attributes.url
}

import xmlJs from 'xml-js'
import { ParseError } from './classes'
import moment from 'moment'

export function parsePodcast (text: string): Podcast {
  const podcastRss: any = xmlJs.xml2js(text, {compact: true});
  const channel = podcastRss.rss.channel

  const podcast: Podcast = {
    title: parsePodcastTitle(channel),
    date: getPodcastDate(channel),
    description: parsePodcastDescription(channel),
    episodes: podcastRss.rss.channel.item.map(parseEpisode)
  }

  return podcast
}

export function parsePodcastTitle (channel: any): string {
  if (channel.title) {
    return channel.title._text
  } else {
    throw new ParseError('Could not parse Podcast.title')
  }
}

export function getPodcastDate (channel: any): string {
  try {
    return moment.utc(parsePodcastDate(channel)).format()
  } catch (error) {
    return moment.utc().format()
  }
}

export function parsePodcastDate (channel: any): string {
  if (channel.pubDate) {
    return channel.pubDate._text
  } else if (channel.lastBuildDate) {
    return channel.lastBuildDate._text
  } else {
    throw new ParseError('Could not parse Podcast.date')
  }
}

export function parsePodcastDescription (channel: any): string {
  if (channel.description) {
    return channel.description._text
  } else {
    return ''
  }
}

export function parseEpisode (item: any, index: number): Episode {
  const episode: Episode = {
    index,
    guid: parseEpisodeGuid (item),
    title: parseEpisodeTitle(item),
    date: parseEpisodeDate(item),
    description: parseEpisodeDescription(item),
    image: parseEpisodeImage(item),
    audio: parseEpisodeAudio(item)
  }
  return episode
}

export function parseEpisodeGuid (item: any): string {
  if (item.guid && item.guid._cdata) {
    return item.guid._cdata
  } else {
    return ''
  }
}

export function parseEpisodeTitle (item: any): string {
  if (item.title) {
    return item.title._text
  } else {
    throw new ParseError('Could not parse Episode.title')
  }
}

export function parseEpisodeDate (item: any): string {
  if (item.pubDate) {
    return moment.utc(item.pubDate._text).format()
  } else {
    return moment.utc().format()
  }
}

export function parseEpisodeDescription (item: any): string {
  if (item.description && item.description._cdata) {
    return item.description._cdata
  } else if (item.description) {
    return item.description._text
  } else {
    return ''
  }
}

export function parseEpisodeImage (item: any): string {
  if (item['itunes:image'] && item['itunes:image']._attributes) {
    return item['itunes:image']._attributes.href
  } else {
    return ''
  }
}

export function parseEpisodeAudio (item: any): string {
  if (item.enclosure && item.enclosure._attributes.url) {
    return item.enclosure._attributes.url
  } else {
    throw new ParseError('Could not parse Episode.audio')
  }
}

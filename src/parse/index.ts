import { parse } from 'date-fns'
import xmlJs from 'xml-js'

export function parsePodcast (text: string): Podcast {
  const podcastRss: any = xmlJs.xml2js(text, {compact: true});
  const channel = podcastRss.rss.channel

  const podcast: Podcast = {
    title: parsePodcastTitle(channel),
    date: getPodcastDate(channel),
    description: parsePodcastDescription(channel),
    episodes: podcastRss.rss.channel.item.map(parseEpisode),
    image: parseImage(channel)
  }

  return podcast
}

export function parsePodcastTitle (channel: any): string | null {
  if (channel.title) {
    return channel.title._text
  } else {
    return null
  }
}

export function getPodcastDate (channel: any): Date | null {
  const datestring = extractPodcastDatestring(channel)

  if (datestring) {
    return parseDatestring(datestring)
  }

  return null
}

export function extractPodcastDatestring (channel: any): string | null {
  if (channel.pubDate) {
    return channel.pubDate._text
  } else if (channel.lastBuildDate) {
    return channel.lastBuildDate._text
  }

  return null
}

export function parsePodcastDescription (channel: any): string | null {
  if (channel.description) {
    return channel.description._text
  } else {
    return null
  }
}

export function parseEpisode (item: any, index: number): Episode {
  const episode: Episode = {
    index,
    guid: parseEpisodeGuid (item),
    title: parseEpisodeTitle(item),
    date: parseEpisodeDate(item),
    description: parseEpisodeDescription(item),
    image: parseImage(item),
    audio: parseEpisodeAudio(item)
  }
  return episode
}

export function parseEpisodeGuid (item: any): string | null {
  if (item.guid && item.guid._cdata) {
    return item.guid._cdata
  } else {
    return null
  }
}

export function parseEpisodeTitle (item: any): string | null {
  if (item.title) {
    return item.title._text
  }
  
  return null
}

export function parseEpisodeDate (item: any): Date | null {
  if (item.pubDate) {
    return parseDatestring(item.pubDate._text)
  } else {
    return null
  }
}

export function parseEpisodeDescription (item: any): string | null {
  if (item.description && item.description._cdata) {
    return item.description._cdata
  } else if (item.description) {
    return item.description._text
  } else {
    return null
  }
}

export function parseImage (item: any): string | null {
  if (item['itunes:image'] && item['itunes:image']._attributes) {
    return item['itunes:image']._attributes.href
  } else {
    return null
  }
}

export function parseEpisodeAudio (item: any): string | null {
  if (item.enclosure && item.enclosure._attributes.url) {
    return item.enclosure._attributes.url
  }

  return null
}

function parseDatestring(datestring: string): Date {
  const cleanedDatestring = datestring.slice(datestring.indexOf(',') + 2).replace(/GMT/, 'Z')
  return parse(cleanedDatestring, 'dd MMM y kk:mm:ss XX', new Date())
}

const podcastJs = require('../bin/index')

test('full fetch test - Hello Internet', () => {
  const feedUrl = 'http://www.hellointernet.fm/podcast?format=rss'
  return podcastJs.fetchPodcast(feedUrl).then((podcast) => {
    expect(podcast.title).toBe('Hello Internet')
  })
})

test('full fetch test - Cortex', () => {
  const feedUrl = 'https://www.relay.fm/cortex/feed'
  return podcastJs.fetchPodcast(feedUrl).then((podcast) => {
    expect(podcast.title).toBe('Cortex')
  })
})

test('full fetch test, title check and date format - Serial', () => {
  const feedUrl = 'http://feeds.serialpodcast.org/serialpodcast'
  return podcastJs.fetchPodcast(feedUrl).then((podcast) => {
    const firstEpisode = podcast.episodes.find(episode => episode.title === 'S01 Episode 01: The Alibi')
    expect(firstEpisode.date).toBe('2014-10-03T13:45:00Z')
  })
})

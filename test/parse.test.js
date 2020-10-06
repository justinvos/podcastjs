const podcastJs = require('../bin/index')

test('full fetch test - Hello Internet', async () => {
  const feedUrl = 'http://www.hellointernet.fm/podcast?format=rss'
  const podcast = await podcastJs.fetchPodcast(feedUrl)
  expect(podcast.title).toBe('Hello Internet')
})

test('full fetch test - Cortex', async () => {
  const feedUrl = 'https://www.relay.fm/cortex/feed'
  const podcast = await podcastJs.fetchPodcast(feedUrl)
  expect(podcast.title).toBe('Cortex')
})

test('full fetch test, title check and date format - Serial', async () => {
  const feedUrl = 'http://feeds.serialpodcast.org/serialpodcast'
  const podcast = await podcastJs.fetchPodcast(feedUrl)
  const firstEpisode = podcast.episodes.find(episode => episode.title === 'S01 Episode 01: The Alibi')
  expect(firstEpisode.date).toBe('2014-10-03T13:45:00Z')
})

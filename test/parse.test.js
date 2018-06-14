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

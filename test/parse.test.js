const podcastJs = require('../bin/index')

const hiFeed = 'http://www.hellointernet.fm/podcast?format=rss'
//const cortexFeed = 'https://www.relay.fm/cortex/feed'

test('full fetch test', () => {
  podcastJs.fetchPodcast(hiFeed).then((podcast) => {
    expect(podcast.title).toBe('Hello Internet')
  })
})
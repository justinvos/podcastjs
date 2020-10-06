const fs = require('fs/promises')
const podcastJs = require('../bin/index')

test.concurrent('full fetch test - Hello Internet', async () => {
  const feed = await getFixture('hello_internet_rss.xml')
  const podcast = await podcastJs.parsePodcast(feed)
  expect(podcast.title).toBe('Hello Internet')
})

test.concurrent('full fetch test - Cortex', async () => {
  const feed = await getFixture('cortex_rss.xml')
  const podcast = await podcastJs.parsePodcast(feed)
  expect(podcast.title).toBe('Cortex')
})

test.concurrent('full fetch test, title check and date format - Serial', async () => {
  const feed = await getFixture('serial_rss.xml')
  const podcast = await podcastJs.parsePodcast(feed)
  const firstEpisode = podcast.episodes.find(episode => episode.title === 'S01 Episode 01: The Alibi')
  expect(firstEpisode.date).toBe('2014-10-03T13:45:00Z')
})

async function getFixture(name) {
  return await fs.readFile(__dirname + '/fixtures/' + name)
}
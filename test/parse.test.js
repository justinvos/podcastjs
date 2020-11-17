const fs = require('fs/promises')
const podcastJs = require('../bin/index')

test.concurrent('full fetch test - Hello Internet', async () => {
  const feed = await getFixture('hello_internet_rss.xml')
  const podcast = await podcastJs.parsePodcast(feed)
  expect(podcast.title).toBe('Hello Internet')
  expect(podcast.image).toBe('https://images.squarespace-cdn.com/content/52d66949e4b0a8cec3bcdd46/1391195775824-JVU9K0BX50LWOKG99BL5/Hello+Internet.003.png?content-type=image%2Fpng')
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
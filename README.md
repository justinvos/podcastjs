# podcast.js

podcast.js fetches and parses podcast RSS fields so you don't have to!

Plus, it comes with TypeScript typings out of the box.

## Install

### Yarn:
```
yarn add podcastjs
```

### NPM:
```
npm install podcastjs
```

## Getting Started

### Plain JavaScript:
```js
const podcastJs = require('podcastjs')

const serialRssUrl = 'http://feeds.serialpodcast.org/serialpodcast'

podcastJs.fetchPodcast(serialRssUrl).then((podcast) => {
  console.log(podcast.title)
})
```

### TypeScript:
```ts
import fetchPodcast, { Podcast } from 'podcastjs'

const serialRssUrl = 'http://feeds.serialpodcast.org/serialpodcast'

fetchPodcast(serialRssUrl).then((podcast: Podcast) => {
  console.log(podcast.title)
})
```

## Documentation

### fetchPodcast
You can fetch and parse an RSS feed by calling the fetchPodcast function.

`fetchPodcast(url)`

Parameters:

- `url` - The podcast's RSS feed's URL to fetch from

Returns a `Podcast` object (defined below)

### Podcast

#### Properties
- `title` - The title of the podcast e.g. `"Serial"`
- `date` - The publication date of the podcast feed in ISO 8601 format e.g. `"2017-10-03T13:45:00Z"`
- `description` - A description of the podcast e.g. `"Serial is a podcast from the creators of..."`
- `episodes` - A list of Episode objects associated with this Podcast (defined below)

Optional Properties:
- `url` - The URL of the podcast's RSS feed e.g. `"http://feeds.serialpodcast.org/serialpodcast"`
- `image` - The podcast's image e.g. `"https://serialpodcast.org/sites/all/modules/custom/serial/img/serial-itunes-logo.png"`

### Episode

#### Properties
- `title` - The title of the episode e.g. `"S01 Episode 01: The Alibi"`
- `date` - The publication date of the podcast feed in ISO 8601 format e.g. `"2014-10-03T13:45:00Z"`
- `description` - A description of the podcast e.g. `"It's Baltimore, 1999. Hae Min Lee, a popular high-sch..."`
- `audio` - The URL of the audio file for this episode e.g. `"https://dts.podtrac.com/redirect.mp3/dovetail.prxu.org/serial/d7f03a15-be26-4634-8884-5fadd404ad75/serial-s01-e01.mp3"`
- `index` - The physical ordering of this episode in the RSS feed e.g. `28`

Optional Properties
- `image` - The podcast's image e.g. `"https://serialpodcast.org/sites/all/modules/custom/serial/img/serial-itunes-logo.png"`

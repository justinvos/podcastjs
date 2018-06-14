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

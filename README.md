# violet

Pre-rendered portofolio website for Haiiro Haiji / Namika Hamasaki.

- Japanese build: https://new.haiji.co/
- English build: https://namika.hmsk.co/

## Setup / Update installed packages

Using Node v8+

```
$ npm i
```

## Development

### Run as English locale

```
$ npm run dev
```

Then open localhost:8000 in your browser.

### Run as Japanese locale

```
$ npm run dev:ja
```

# Directory/File structure for the content writer

## Add content

1. Create new markdown file to under `/contents/works/:locale`
  - file name is used for URL. e.g. `/contents/works/ja/amazarashi.md` -> `https://domain/works/mazarashi`
1. Add filename to `orderedWorks` Array on `/nuxt.config.js`
  - This data is used for index page's list and configured as pre-rendering target

### Markdown format


#### Sample `/contents/works/en/amazarashi.md`

```md
title: Amazarashi Music Video
year: 2015
owner: Sony Music Entertainment
role: UI Design
related:
  - pokemon-go
  - googleplay-game-effect
  - laughly
colors:
  - "#34393d"
  - "#263228"
  - "#555c6f"
  - "#797979"
  - "#a40505"
  - "#686868"
description: |
  Amazarashi is a Japanese rock band that continues to question modern society through its songs. I designed a user interface for their music video during my period at SIX, creative agency in Tokyo, Japan.
---

```

#### Show multimedia files

1. Put the file to `/static/images/works` as `[work name]_something.png`
2. Call with `<work-media>` custom element in the markdown file for same work
  - `<work-media name="something.png">` (don't need "work name" part)
  - If you put `mp4`, rendered with video player automatically 😉

## License

- [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) for [SVG icons](/assets/icons) excepting `hatenablog.svg` by [FontAwesome](https://fontawesome.com/license)
- Each author of [depending NPM modules](/package.json) which are published as "MIT" or "ISC" reserves all rights
- Namika Hamasaki / Haiji Haiiro reserves all rights for [Markdown documents](/contents)
- Namika Hamasaki / Haiji Haiiro or the each product owners reserve all rights for [Image or Video files](/static/images)
- Kengo Hamasaki and Namika Hamasaki / Haiji Haiiro reserver all rights for source code of this project under the MIT License

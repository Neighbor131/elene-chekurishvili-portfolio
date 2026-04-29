# Elene Portfolio

Static first pass of Elene Chekurishvili's portfolio site, based on the provided Figma pages and the Regular Framer reference.

## Run locally

From this folder:

```bash
python3 -m http.server 8001
```

Then open:

```text
http://127.0.0.1:8001/
```

## Structure

- `index.html` - the homepage grid for case studies, articles, and other work.
- `about.html` - the about/contact page.
- `projects.js` - the project data used to render homepage cards.
- `articles.js` - the browser renderer for article cards.
- `data/articles.js` - generated article data for the Articles page.
- `scripts/sync-medium.mjs` - fetches a Medium RSS feed and writes `data/articles.js`.
- `styles.css` - layout, typography, responsive behavior.
- `assets/` - local logo and portrait imagery.

## Add a homepage item

Edit `projects.js` and add another object:

```js
{
  title: "Project title",
  cover: "./assets/project-cover.jpg",
  href: "./case-studies/project-title.html",
  ratio: "4 / 5",
  type: "Case study",
}
```

`ratio` is optional. Omit it when you want the cover to render at its natural image aspect ratio.

## Sync Medium articles

Medium supports RSS feeds for public profiles and publications:

- Profile: `https://medium.com/feed/@username`
- Subdomain profile: `https://username.medium.com/feed`
- Publication: `https://medium.com/feed/publication-name`

Run:

```bash
node scripts/sync-medium.mjs https://medium.com/feed/@username
```

This writes `data/articles.js`, which powers `articles.html`.

The script also generates one rich-text page per Medium post inside `articles/`.
Each generated page includes a `Read on Medium` button that links back to the original story.

## Custom article covers

Create custom images in `assets/articles/`, then map a Medium URL to your local cover in `data/article-overrides.json`:

```json
{
  "https://medium.com/@username/story-slug-123": {
    "cover": "./assets/articles/custom-cover.png",
    "ratio": "4 / 5",
    "title": "Optional edited title"
  }
}
```

Run the sync command again after editing overrides.

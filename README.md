# Arab2Roman converter – offline-first PWA

> DASW · Unit 5 · Slides: **Unit5.PWA.2026.pptx, slide 28**

## Background

The Roman-numeral converter from Unit 4 as a static PWA. The previous front-end used jQuery Mobile 1.1 and
called a Heroku back-end that no longer exists (Heroku's free tier ended in 2022). Now:

- `docs/js/roman.js` – pure functions `toRoman` / `fromRoman` (canonical numerals 1–3999), unit-tested with `node --test`.
- Conversions run **locally**, so the app works completely offline; the last five conversions are stored in `localStorage`.
- Plain HTML/CSS (no jQuery), manifest with relative `start_url`/`scope`, square and maskable icons, cache-first service worker.
- The duplicated `pwa/PWA/Arab2RomanServer` folder and its `.rar` were removed.

The server-side version (Express 5 + MongoDB) is in the Unit 4 examples (`node.js/Arab2RomanServer`).

## What you will practise

- A PWA checklist applied to a real app
- Testing pure logic with `node --test`
- Deploying to GitHub Pages

## How to run it

```bash
npm start          # serves docs/ on http://localhost:3000
npm test           # node --test (roman.js)
```
**Deploy to GitHub Pages**: push the folder to a repository, then Settings → Pages → *Deploy from a branch* → `main` / `docs`.

## Where to look

- `docs/index.html`
- `docs/js/roman.js`, `app.js`
- `docs/sw.js`
- `docs/manifest.json`
- `test/roman.test.mjs`

## Theory and further reading

- [MDN – Making PWAs installable](https://developer.mozilla.org/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)
- [GitHub Pages – publishing source](https://docs.github.com/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Node.js test runner](https://nodejs.org/api/test.html)

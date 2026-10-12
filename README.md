# KAI · Brunch in Leicester

A speculative website for KAI, the all-day brunch and pancake café at 4 St Martin's Square, Leicester. Built as a pitch: front end only, static data, no backend.

**Live:** https://alexwilder-dev.github.io/KAI/ (becomes `/kai-leicester/` if the repo is renamed to `kai-leicester`)

## What's in it

- **Home:** their own café video in the hero, a live "Open now" strip (London time), the *Sweet or savoury?* pancake picker, brunch on sourdough, loaded tots with the Red Leicester callout, the café, reviews, Deliveroo, and find us.
- **Menu** (`#/menu`): every dish and price, with sticky section tabs and a jump to the vegan option.
- A bottom bar on phones keeps Menu, Directions and Deliveroo one tap away.

## Demoing a day and time

Add `?at=` to the URL to preview the Open-now strip and today's hours at any moment:

- `?at=sat-08:15` and `?at=sat-13:00`: Saturday rush line, with Deliveroo
- `?at=tue-10:00`: "Pull up a chair."
- `?at=fri-19:00`: "Back at 8 tomorrow."

## Develop

```bash
npm install
npm run dev       # http://localhost:5173/kai-leicester/
npm run build     # outputs dist/
npm run images    # rebuilds dish crops, stills, og.jpg and icons from media-src/
```

Vite, React, TypeScript, Framer Motion, HashRouter.

`.github/workflows/deploy.yml` deploys every push to the default branch to GitHub Pages (Settings → Pages → Source: GitHub Actions). The build takes its base path and the absolute link-preview URLs from the Pages address, so it follows the repo name. Local builds default to `/kai-leicester/`.

## Media

All photography and video are KAI's own: the video and banner from kai.kitchen and their Deliveroo menu photo. Raw files live in `media-src/`; `npm run images` crops them into `public/img/`. The logo is drawn inline from their `kai-eat-well.svg`.

Data (prices, hours, reviews) is in `src/data.ts` and `src/lib/hours.ts`.

---

Site by AlexWilder-Dev

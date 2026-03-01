# Maytooons 🎭

React + TypeScript + Vite project.

## Setup

```bash
npm install
npm run dev
```

## Build for production (GitHub Pages)

```bash
npm run build
# dist/ folder → push to GitHub
```

## Project Structure

```
src/
  components/
    Loader.tsx        — Scared GIF loader overlay
    CharacterDisplay.tsx — Character + speech bubble + badge
    MoodCard.tsx      — Individual mood selection card
    ChatButton.tsx    — Chat CTA shown after mood selected
    CustomCursor.tsx  — Yellow dot cursor
  data/
    moods.ts          — All mood config (label, emoji, gif path, colors)
  types/
    index.ts          — TypeScript interfaces
  App.tsx             — Main layout
  main.tsx            — Entry point
  index.css           — Global styles + keyframes

public/
  images/             — Put all your GIFs and PNGs here
    smile.gif
    excite.gif
    scare.gif
    annoy.gif
    maytooonsLogo.png
    mayTooonsLogoHead.png
```

## Adding a new mood

1. Add your GIF to `public/images/`
2. Open `src/data/moods.ts`
3. Add a new entry to the `MOODS` array
4. Add the new key to `MoodKey` type in `src/types/index.ts`

## Replacing emojis

All emojis are in `src/data/moods.ts` in the `emoji` field.
Replace with your own custom emoji images by changing to `<img>` tags in `MoodCard.tsx`.
```

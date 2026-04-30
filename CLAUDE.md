# Janel Co — Portfolio Website

## What this project is
A personal portfolio website for Janel Co, a Product Designer and IAT student at Simon Fraser University, Vancouver BC. Built in React (JSX), faithfully recreated from her Figma/Framer design.

## Current state
The main file `src/App.jsx` is complete and working. The immediate next task is **replacing placeholder images with real local images** from `Desktop/Janel's Portfolio/` on Janel's computer.

## How to run
```bash
npm create vite@latest janel-portfolio -- --template react
cd janel-portfolio
npm install
# Replace contents of src/App.jsx with the code in src/App.jsx in this repo
npm run dev
```

## Project structure
```
janel-portfolio/
├── CLAUDE.md               ← you are here
├── docs/
│   ├── DESIGN_TOKENS.md    ← all colors, fonts, spacing, animation values
│   ├── COMPONENTS.md       ← how every component works
│   └── CONTENT.md          ← all text, links, project data
├── public/
│   └── images/             ← PUT JANEL'S LOCAL IMAGES HERE
└── src/
    └── App.jsx             ← entire app, single file
```

---

## Tech stack
- **React** with `useState` + `useEffect` only — no router, no external libraries
- **Inline styles only** — no CSS files, no Tailwind, no CSS modules
- **Single file** — everything lives in `src/App.jsx`
- **Fonts** — DM Sans via Google Fonts (imported in `<style>` tag inside JSX)

---

## Critical design rules — DO NOT change these

### 1. Colors
| Token | Value |
|---|---|
| Page background | `#FFFDFA` |
| Text primary | `#1c1c1a` |
| Pink highlight | `rgba(254,228,228,0.81)` |
| Pink cursor hover | `rgba(230,180,180,0.92)` |
| Link hover | `#E99DAC` |
| Link active/selected | `#F6C8D1` |

### 2. Hero animation — the most important feature
- Each word fades in **one at a time**, staggered by `130ms`
- Each word animates: `opacity 0→1`, `blur(3px)→blur(0)`, `translateY(8px)→0`
- **"curiosity"** gets a pink highlight that wipes **left-to-right** (via `background-size`) the moment that word appears
- **"creative solutions,"** is a **single token** — both words are wrapped in ONE `<span>` so the highlight box is continuous across both words. The highlight wipes in when "creative solutions," appears.
- Highlight gradient: `linear-gradient(to bottom, transparent 58%, rgba(254,228,228,0.81) 58%, rgba(254,228,228,0.81) 92%, transparent 92%)` — sits in the lower half of the text line
- Easing for everything: `cubic-bezier(0.22,1,0.36,1)`

### 3. Custom cursor
- 20px pink circle, grows to 26px and darkens on hover over `a`/`button`
- `cursor: none` on `body`, `a`, `button`

### 4. Nav
- Fixed, `72px` tall
- Logo (許) and links sit at **bottom** of nav: `align-items: flex-end`, `padding: 0 44px 16px`
- 許 font: **Hiragino Maru Gothic Pro**, weight **400** (not bold)

### 5. View button on cards
- Border radius: `12px`
- Color: `#999` default, `#1c1c1a` on hover — text and border always match
- Label: `View →` (space before arrow)

---

## Immediate TODO
- [ ] **Swap placeholder images** — copy images from `~/Desktop/Janel's Portfolio/` into `public/images/` then update the `image:` paths in the `PROJECTS` and `CREATIVE` arrays at the top of `src/App.jsx`
- [ ] Add real `href` links for Food Stash Foundation and City of Vancouver projects (currently `"#"`)
- [ ] Build out individual project case study pages
- [ ] Add About page photo

## Image swap instructions
```bash
mkdir -p public/images
cp ~/Desktop/Janel\'s\ Portfolio/* public/images/
```
Then in `src/App.jsx`, update each `image:` field:
```js
image: "/images/your-filename.png"
```
Cards use `aspectRatio: "4/3"` with `objectFit: "cover"` — images should ideally be landscape at 900px+ wide.

---

## Links & contact
- Email: janelstephanie@yahoo.com
- LinkedIn: https://www.linkedin.com/in/janelco/
- Resume (view): https://drive.google.com/file/d/1jR0-UFpSR3s455D-ho1Jdca-T7b124f-/view?usp=sharing
- Resume (download): https://drive.google.com/file/d/14xG657SVpu8rUv6r4Fj_f0MBewrT8FCw/view?usp=sharing
- Framer site (reference): https://janelco.framer.website
- Figma file (requires login): https://www.figma.com/design/gRWtRKsxYcVi6jPBikJY1X/portfolio

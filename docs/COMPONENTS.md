# Components

All components live in `src/App.jsx`. No props types, no external libraries.

---

## `HeroText`
The animated headline. Most complex component in the project.

### How it works
1. `TOKENS` array at top of file defines each word. Plain strings = normal words, objects `{ word, hl }` = highlighted words.
2. On mount, `useEffect` fires a `setTimeout` per non-space word, incrementing `revealedWords` by 1 each time, staggered by `STAGGER` (130ms).
3. Each word span reads `visible = myIdx < revealedWords` and applies fade+blur entrance.
4. `showCur` and `showCre` are set at the exact moment their word index is reached — triggering the `background-size` wipe.

### Highlight system
- Uses `background-size: "0% 100%" → "100% 100%"` with `backgroundRepeat: "no-repeat"` and `backgroundPosition: "left center"` to wipe left-to-right
- Gradient stops: `transparent 0–58%`, `rgba(254,228,228,0.81) 58–92%`, `transparent 92–100%` — sits in the lower-middle of the text line
- **"curiosity"** — single word token `{ word: "curiosity", hl: "cur" }`, gets its own highlight span with `backgroundSize` driven by `showCur`
- **"creative solutions,"** — single token `{ word: "creative solutions,", hl: "cre" }` (the whole phrase is one token including the space). Rendered inside a wrapper `<span>` with the highlight background so it's ONE continuous box. Driven by `showCre`.

### Key constants
```js
const STAGGER = 130;  // ms between words — change to adjust speed
const START   = 200;  // ms before first word
```

### DO NOT break
- `"creative solutions,"` must be ONE token — splitting it breaks the single highlight box
- The `cre-group` span uses `display: "inline"` with `boxDecorationBreak: "clone"` — needed for the background to span both words

---

## `FadeUp`
Simple wrapper div that fades + slides up on mount.

```jsx
<FadeUp delay={300} style={{ ... }}>
  <YourContent />
</FadeUp>
```

Props: `delay` (ms), `style` (merged onto wrapper div)

---

## `Card`
Project card for both work projects and creative work.

```jsx
<Card p={projectObject} delay={300} />
```

Project object shape:
```js
{
  id: "fraserhealth",
  category: "Fraserhealth",         // small gray label
  title: "Increasing long-term...", // main title
  role: "Role · UX Research, ...",  // small faint tag
  image: "/images/fraserhealth.png",// local path or URL
  href: "https://...",              // link on click
}
```

Features:
- Image zooms to `scale(1.04)` on hover
- "View →" pill button right-aligned, `12px` border radius, text+border both `#999` (matching colors)
- Entrance: `opacity 0→1`, `translateY 24px→0`, triggered by `delay` prop

---

## `Cursor`
Custom cursor — replaces browser default globally.

- Tracks `mousemove`, hides on `mouseleave`, shows on `mouseenter`
- Detects hover over any `a` or `button` via `closest()` — grows + darkens
- `cursor: none` applied globally via `<style>` tag

---

## `Nav`
Fixed top navigation.

- Height `72px`, items at bottom via `align-items: flex-end`
- 許 (Unicode `\u8A31`) in Hiragino Maru Gothic Pro weight 400 — navigates to home page
- About button (in-app navigation via `setPage`)
- Resume → external Google Drive link

---

## `Footer`
Simple two-column footer.
- Left: "DESIGNED WITH 🤍 BY JANEL CO"
- Right: Linkedin, Email, Resume links
- `border-top: 1px solid #e8e4dc`

---

## `Home`
Home page layout:
1. Hero section (full width, `108px` top padding, centered, text left-aligned)
2. Bouncing chevron (fades in after all hero words)
3. 2-col project grid (`PROJECTS` array)
4. "My other creative work ✨" heading
5. 2-col creative grid (`CREATIVE` array)
6. Footer

## `About`
About page layout:
1. "GET TO KNOW ME" label (pink, uppercase, small)
2. Heading "Hi there, I'm Janel! Nice to meet you 👋🏻"
3. Bio paragraphs
4. "Download resume" button (pill style)
5. Footer

---

## App (root)
```jsx
const [page, setPage] = useState("home"); // "home" | "about"
```
No React Router — simple state toggle. `<Nav>` calls `setPage`.

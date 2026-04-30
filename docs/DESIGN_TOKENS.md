# Design Tokens

## Colors
```js
const COLORS = {
  background:        "#FFFDFA",
  textPrimary:       "#1c1c1a",
  textSecondary:     "#555",
  textMuted:         "#999",
  textFaint:         "#bbb",
  textNav:           "#666",
  borderLight:       "#e8e4dc",
  cardImageBg:       "#e3e0d9",

  // Pink system
  highlightPink:     "rgba(254,228,228,0.81)",   // hero highlight + cursor default
  cursorHover:       "rgba(230,180,180,0.92)",    // cursor on links/buttons
  linkHover:         "#E99DAC",                  // all a/button :hover
  linkActive:        "#F6C8D1",                  // all a/button :active
  aboutAccent:       "#D4537E",                  // "GET TO KNOW ME" label
};
```

## Typography
```js
// Fonts
"'DM Sans', sans-serif"           // body, UI, headings
"'Hiragino Maru Gothic Pro', ..."  // 許 logo only

// Hero h1
fontSize: "clamp(30px, 3.55vw, 54px)"
fontWeight: "500"
lineHeight: 1.35
letterSpacing: "-0.015em"

// Nav links
fontSize: "14px", fontWeight: "400"

// 許 logo
fontSize: "22px", fontWeight: "400"   // MUST be 400, not bold

// Card category
fontSize: "12.5px", color: "#999"

// Card title
fontSize: "15px", fontWeight: "400", lineHeight: "1.43"

// Card role tag
fontSize: "11.5px", color: "#bbb"

// View button
fontSize: "12px"

// Section heading ("My other creative work")
fontSize: "20px", fontWeight: "500", textAlign: "center"

// Footer label
fontSize: "10.5px", letterSpacing: "0.09em", textTransform: "uppercase"

// About h1
fontSize: "clamp(28px, 3.6vw, 48px)", fontWeight: "500", lineHeight: 1.22

// About body
fontSize: "16px", lineHeight: 1.8, color: "#555"
```

## Spacing & Layout
```js
// Page
maxWidth: "1160px"    // all sections
sidePadding: "44px"   // all sections

// Nav
navHeight: "72px"
navPaddingBottom: "16px"   // items sit at bottom of nav

// Hero section
heroTopPadding: "108px"

// Project grid
gridColumns: "1fr 1fr"
columnGap: "28px"
rowGap: "52px"

// Section spacing
beforeProjects: "100px"
beforeCreative: "96px"
beforeFooter: "96px"   // marginTop on footer wrapper

// Cards
imageAspectRatio: "4/3"
imageBorderRadius: "12px"
imageMarginBottom: "14px"
textGap: "3px"         // between category/title/role
viewButtonMarginTop: "14px"
```

## Animation
```js
const SPRING = "cubic-bezier(0.22,1,0.36,1)";

// Hero word-by-word
STAGGER = 130        // ms between each word
START   = 200        // ms initial delay

// Word entrance
opacity:   "1s"
filter:    "1.1s"
transform: "1s"
blur:      "blur(3px)" → "blur(0px)"
translateY: "8px" → "0px"

// Highlight wipe
backgroundSize: "0% 100%" → "100% 100%"
duration: "0.9s"

// FadeUp (sections, chevron)
duration: "1s"
translateY: "24px" → "0px"

// Card entrance
duration: "0.9s"
translateY: "24px" → "0px"
stagger: 150ms per card

// Cursor
transition: "0.2s ease"
size default: 20px, hover: 26px
```

## Border Radii
```js
viewButton:       "12px"
cardImage:        "12px"
downloadResume:   "24px"
cursor:           "50%"
```

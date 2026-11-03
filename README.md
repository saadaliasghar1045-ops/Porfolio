# Machine Learning Portfolio

A neumorphic, light + dark portfolio built with plain HTML, CSS and JavaScript. No build step: open `home.html`.

```
portfolio/
├── home.html                  page structure + section order
├── README.md
├── assets/
│   ├── images/                your photos and project screenshots
│   └── icons/                 tool logos (.svg) + favicon
├── stylesheets/
│   ├── theme-base.css         BASE THEME: fonts, radius, spacing, shadow depth
│   ├── theme-colors.css       COLOUR THEME: light + dark palettes
│   ├── animations.css         reveal + scroll animation look (timing)
│   ├── site-effects.css       grain, scrollbar, small global details
│   └── navbar / hero / biography / skills / projects / showcase / experience / contact .css
└── javascript/
    ├── profile.js             ALL YOUR CONTENT (name, skills, tools, projects, journey)
    ├── animations.js          smooth scroll, reveals, parallax, stacking cards
    ├── site-effects.js        theme toggle + shared helpers
    └── navbar / hero / biography / skills / projects / showcase / experience / contact .js
```

Pages load order: theme files, then animations, then each section. Each section has its own CSS (and JS only where it needs behaviour; `showcase`, `experience` etc.).

---

## 1. First things to do

Open `javascript/profile.js` and fill in:

```js
profile: {
  name: 'Your Name',
  email: 'you@example.com',          // enables the contact form (opens the visitor's email app)
  social: [
    { label: 'GitHub',   href: 'https://github.com/you',      icon: 'i-github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/you', icon: 'i-linkedin' },
  ],
}
```

## 2. Add a tool (small card + moving strip)

In `profile.js` add one line to `tools`:

```js
{ name: 'Plotly', icon: 'plotly.svg', cat: 'Data & Viz', color: 'var(--c-blue)' },
```

1. Put the logo file in `assets/icons/plotly.svg`.
2. No logo? Leave `icon: ''` and add `mono: 'Pl'`; a coloured monogram card is generated.
3. `cat` creates a filter button automatically. Use an existing category or invent a new one.

The hero strip and the stats counter update on their own.

## 3. Add an academic skill

Add to `academic` in `profile.js`:

```js
{ title: 'Computer Vision', group: 'core', icon: 'brain', text: 'One-sentence description.' },
```

- `group: 'core'` big card, `'data'` step in the data-craft flow, `'delivery'` wide card.
- `icon` names: brain, chart, loop, download, layers, sparkle, wrench, filter, rocket. More icons can be added to `ICONS` at the top of `javascript/skills.js`.

## 4. Add a project

Copy a block inside `projects`, put the screenshot in `assets/images/`, set `image: 'file.jpg'`. Add `link` and/or `code` URLs and the buttons appear. Cards stack on scroll automatically.

## 5. Add experience / growth

Add an object to `timeline` (newest last). The last item gets the pulsing "now" dot.

```js
{ when: 'Spring 2026', title: 'Kaggle competition', text: 'What you did and learned.' },
```

## 6. Change the look of the whole site from one place

| Want to change | Edit |
| --- | --- |
| Light/dark colours, accent colour, glow | `stylesheets/theme-colors.css` |
| Rounded corners, spacing between sections, fonts, neumorphic depth (`--depth`) | `stylesheets/theme-base.css` |
| Reveal speed, distance, blur, easing | top of `stylesheets/animations.css` |
| Smooth-scroll feel, stagger delay, stacking-card effect | `CONFIG` at top of `javascript/animations.js` |

Handy variables: `--accent` (main colour), `--space-section` (the "pause" between sections), `--depth` (0.6 flatter, 1.4 deeper shadows). Sections also have `data-tone="a|b|c"` in `home.html`; each tone nudges the accent slightly, defined at the bottom of `theme-colors.css`.

## 7. Reveal animations on new content

Add attributes to any element:

```html
<h2 data-split>Words slide up one by one</h2>
<div data-reveal="up" data-delay="200">Fades and rises</div>
<ul data-stagger><li data-reveal="up"></li><li data-reveal="up"></li></ul>
```

Types: `up`, `down`, `left`, `right`, `scale`, `fade`, `rise`. Content you render with JS can call `Motion.reveal(container)` afterwards.

## 8. Images

- Header/navbar + hero: `assets/images/portrait-studio.jpg`
- Biography (full screen): `assets/images/portrait-outdoor.jpg`. Square or portrait photos with the face in the upper-middle work best.

Replace the files with the same names to swap pictures.

## 9. Layout notes

- Desktop (1024px and up): floating top bar. Mobile and tablet: bottom bar with icons.
- Biography is a scroll-pinned section: the portrait grows to fill the screen, then the story fades through three steps. Tune the timing at the top of `javascript/biography.js` (`HEAD_AT`, `STEPS`) and the height in `.bio { height: 380vh }`.
- `prefers-reduced-motion` users get no animation automatically.

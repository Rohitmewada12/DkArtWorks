# DK Arts — cinematic portfolio & commission site

A one-page portfolio site for Deepak Mewada (DK Arts) — sketches, paintings
and commissioned portrait work — built with React + Vite. Theme: a dark,
cinematic "screening room" look — near-black sets, a warm gold spotlight
accent, letterbox framing in the hero, a brief opening title card, a
full-screen lightbox for artwork, and a horizontal "reels" strip for short
process videos.

## 1. Install & run

You'll need [Node.js](https://nodejs.org) (v18 or newer) installed.

```bash
cd dkarts-portfolio
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

## 2. Personalize it

**`src/data/site.js`** — name, tagline, bio, Instagram/YouTube links,
contact email, commission types and the 4-step process text.

**`src/data/artworks.js`** — the gallery (31 pieces already wired in). Each
entry has a title, category (`Sketch` / `Painting` / `Commission`), medium,
and two image paths:
- `image` — the full-size photo, used in the full-screen viewer
- `thumb` — a small, fast-loading version, used in the grid

To add a new piece: drop the photo in `public/gallery/`, make a small
version in `public/gallery/thumbs/` (same filename), and add an entry here.
Keeping a separate small "thumb" version is what keeps the gallery feeling
fast — the grid never has to download full-resolution photos just to show
a small tile.

**`src/data/videos.js`** — the "Process Reels" section. Leave it empty and
the site shows tasteful "coming soon" cards linking to Instagram instead —
it never looks broken. To add a real clip, drop an `.mp4` in
`public/videos/` (see the README.txt in that folder) or link a YouTube
video/short by ID, then add one line here. Full format examples are
commented in the file itself.

**`src/data/pricing.js`** — the new Pricing section. **Important: the
prices in here are starter placeholders, not real numbers** — I set them
to plausible defaults for a portrait artist so the section looks complete,
but Deepak needs to go through and change every price to what he actually
wants to charge. Also edit the "Add-ons" list and the "Also available"
box (original artworks / prints / gift vouchers) — remove anything he
doesn't actually want to offer, since right now they're just ideas for
things worth selling alongside custom commissions.

**`public/gallery/artist.jpg`** — the About-section photo.

**`public/gallery/logo.jpg`** — the DK Arts logo, shown in the nav bar and
in the center of the spinning "open for commissions" badge on the hero.

## 3. What's cinematic about it

- A brief opening title card (fades in the brand name, then fades away —
  skippable with a click or any key press)
- Letterbox bars and a slow "Ken Burns" zoom on the hero backdrop photo
- Film-grain texture over the whole page, and a gold cursor-follow ring
  on desktop
- A bento-style, paginated gallery grid — click any piece for a full-screen
  viewer with next/previous navigation (arrow keys work too), and a
  blur-up transition from thumbnail to full image
- A horizontal "reels" strip of short vertical video clips, opening in a
  focused player on click
- Scrolling marquee ribbons between sections

All animations respect the "reduce motion" accessibility setting.

## 4. Build for production

```bash
npm run build
```

This creates a `dist/` folder — the finished static site, ready to upload
to hosting.

## 5. Put it online (free options)

- **Vercel** ([vercel.com](https://vercel.com)) — connect the project
  folder or a GitHub repo, it detects Vite automatically.
- **Netlify** ([netlify.com](https://netlify.com)) — drag-and-drop the
  `dist/` folder after `npm run build`, or connect a repo.

Either gives a free `https://` link to put in the Instagram bio.

## What's in the box

```
src/
  data/
    site.js        ← name, socials, bio, commission types, process steps
    artworks.js     ← gallery items (31 real pieces already wired in)
    videos.js       ← process reels (empty by default — see comments)
  components/       ← each part of the page, with matching .css
  index.css         ← shared design tokens (dark cinematic palette)
public/
  gallery/          ← all artwork photos (full size) and the logo/artist photo
  gallery/thumbs/    ← small fast-loading versions used in the grid
  videos/           ← drop .mp4 clips here (see README.txt inside)
```

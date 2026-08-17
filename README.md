# DK Arts — portfolio & commission site

A one-page portfolio site for an artist who does sketches, paintings and
commission work, built with React + Vite. Theme: a warm "sketchbook" look —
aged paper, graphite ink, a Prussian-blue accent, and hand-drawn line
flourishes that draw themselves in as you scroll.

Since I didn't have your brother's real name, artwork photos, or pricing,
everything content-related is filled in with clearly-marked placeholders.
The whole site is built so you only need to touch a couple of files to make
it real — no design/CSS knowledge required for that part.

## 1. Install & run

You'll need [Node.js](https://nodejs.org) (v18 or newer) installed.

```bash
cd dkarts-portfolio
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`) to see the site
live. It updates automatically as you edit files.

## 2. Personalize it — start here

**`src/data/site.js`** — the one file to edit first:
- `fullName` — his real name
- `tagline`, `bio` — short intro text
- `instagramUrl` — already set to `instagram.com/dkarts_718`
- `youtubeUrl` — replace with the real channel URL
- `contactEmail` — a real email, or delete the email button in
  `src/components/Contact.jsx` if Instagram DMs are the only channel
- `commissionTypes` — the kinds of commissions offered and rough turnaround
- `process` — the 4 steps shown in the "How a commission comes together"
  section

**`src/data/artworks.js`** — the gallery:
- Each artwork is one entry with a title, category and medium.
- Drop photos into `public/gallery/` and add an `image: "/gallery/your-file.jpg"`
  field to the matching entry — the pencil-hatch placeholder tile is
  automatically replaced with the real photo.
- Add or remove entries freely; categories are `Sketch`, `Painting` or
  `Commission` (these power the filter buttons).

**`src/components/About.jsx`** — replace the dashed placeholder frame with
a real photo the same way: add an `<img>` there once you have one.

## 3. Build the production version

```bash
npm run build
```

This creates a `dist/` folder with the finished static site — this is what
you upload to hosting.

## 4. Put it online (free options)

The easiest options for a static React/Vite site:

- **Vercel** ([vercel.com](https://vercel.com)) — connect the project
  folder (or a GitHub repo with it), it detects Vite automatically.
- **Netlify** ([netlify.com](https://netlify.com)) — drag-and-drop the
  `dist/` folder after running `npm run build`, or connect a repo.
- **GitHub Pages** — works too, needs a small extra config step (`base` in
  `vite.config.js`) — ask if you'd like this set up.

Any of these give a free `https://` link you can put straight in the
Instagram bio.

## What's in the box

```
src/
  data/
    site.js        ← name, socials, bio, commission types, process steps
    artworks.js     ← gallery items
  components/       ← each section of the page (Hero, Gallery, Process,
                       About, Contact, Nav, Footer) with matching .css
  index.css         ← shared design tokens (colors, type, spacing)
public/
  gallery/          ← put artwork photos here
```

## Notes

- The contact form opens the visitor's email app with the message
  pre-filled (no backend needed). If you'd rather have messages land in an
  inbox directly without opening a mail app, that needs a small form
  service (e.g. Formspree) — happy to wire that up if wanted.
- All animations respect "reduce motion" accessibility settings.
- The site is fully responsive (phone/tablet/desktop).
